import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Square, Play, Pause, Trash2, Volume2, VolumeX, Sparkles, AlertCircle } from 'lucide-react';
import { LanguageCode, SUPPORTED_LANGUAGES, UI_STRINGS, getUIString } from '../utils/i18n';

interface AudioRecorderPlayerProps {
  currentLanguage: LanguageCode;
  onTranscriptReceived?: (transcript: string) => void;
  onAudioRecorded?: (audioDataUrl: string) => void;
  recordedAudioUrl?: string | null;
  onClearAudio?: () => void;
  textToRead?: string;
  label?: string;
}

export const AudioRecorderPlayer: React.FC<AudioRecorderPlayerProps> = ({
  currentLanguage,
  onTranscriptReceived,
  onAudioRecorded,
  recordedAudioUrl,
  onClearAudio,
  textToRead,
  label,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeakingTTS, setIsSpeakingTTS] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];
  const strings = UI_STRINGS[currentLanguage] || UI_STRINGS.en;

  // Initialize SpeechRecognition if available
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = currentLangObj.speechLang;

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          if (currentTranscript && onTranscriptReceived) {
            onTranscriptReceived(currentTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition status:', event.error);
        };

        recognitionRef.current = recognition;
      } catch (e) {
        console.warn('Speech recognition initialization error', e);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentLanguage, currentLangObj.speechLang]);

  // Start Voice Recording
  const startRecording = async () => {
    setAudioError(null);
    audioChunksRef.current = [];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone access is not supported in this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          if (onAudioRecorded) {
            onAudioRecorded(base64Audio);
          }

          // Call server-side gemini-3.5-transcribe
          try {
            const res = await fetch('/api/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audioBase64: base64Audio, mimeType: 'audio/webm' }),
            });
            const data = await res.json();
            if (data.success && data.transcript && onTranscriptReceived) {
              onTranscriptReceived(data.transcript);
            }
          } catch (transcribeErr) {
            console.warn('Transcription request failed:', transcribeErr);
          }
        };
        reader.readAsDataURL(audioBlob);

        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start(250);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingSeconds(0);

      // Start elapsed timer
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      // Also start speech recognition if available
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch {}
      }
    } catch (err: any) {
      console.warn('Audio record error:', err);
      setAudioError(err.message || 'Microphone access denied or unavailable.');
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
  };

  // Toggle playback of recorded audio
  const togglePlayAudio = () => {
    if (!audioPlayerRef.current && recordedAudioUrl) {
      const audio = new Audio(recordedAudioUrl);
      audio.onended = () => setIsPlaying(false);
      audioPlayerRef.current = audio;
    }

    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause();
        setIsPlaying(false);
      } else {
        audioPlayerRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // TTS Readout using SpeechSynthesis in the chosen language
  const toggleTextToSpeech = () => {
    if (!window.speechSynthesis) return;

    if (isSpeakingTTS) {
      window.speechSynthesis.cancel();
      setIsSpeakingTTS(false);
    } else if (textToRead) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = currentLangObj.speechLang;
      utterance.rate = 1.0;

      utterance.onend = () => setIsSpeakingTTS(false);
      utterance.onerror = () => setIsSpeakingTTS(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeakingTTS(true);
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-neutral-200 block">
              {label || strings.voiceNote}
            </span>
            <span className="text-[10px] text-neutral-400">
              {currentLangObj.flag} {currentLangObj.nativeName} ({currentLangObj.label})
            </span>
          </div>
        </div>

        {/* TTS Readout Button if textToRead is provided */}
        {textToRead && (
          <button
            type="button"
            onClick={toggleTextToSpeech}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition ${
              isSpeakingTTS
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white'
            }`}
            title="Read out loud with Text-to-Speech"
          >
            {isSpeakingTTS ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isSpeakingTTS ? 'Stop Reading' : strings.listenReport}</span>
          </button>
        )}
      </div>

      {audioError && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[11px]">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{audioError}</span>
        </div>
      )}

      {/* Recording in progress */}
      {isRecording ? (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <div>
              <span className="text-xs font-semibold text-red-400 block">{strings.listening}</span>
              <span className="text-[10px] font-mono text-neutral-400">Recording: {formatSeconds(recordingSeconds)}</span>
            </div>
          </div>

          {/* Sound wave bars */}
          <div className="flex items-center gap-1 h-5">
            <div className="w-1 bg-red-400 rounded-full animate-bounce h-4" />
            <div className="w-1 bg-red-400 rounded-full animate-bounce h-5 delay-75" />
            <div className="w-1 bg-red-400 rounded-full animate-bounce h-3 delay-150" />
            <div className="w-1 bg-red-400 rounded-full animate-bounce h-5 delay-100" />
          </div>

          <button
            type="button"
            onClick={stopRecording}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition"
          >
            <Square className="w-3 h-3 fill-current" />
            <span>{getUIString(currentLanguage, 'stopRecording')}</span>
          </button>
        </div>
      ) : recordedAudioUrl ? (
        /* Audio playback view */
        <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlayAudio}
              className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
              title="Play voice note"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <div>
              <span className="text-xs font-semibold text-neutral-200 block">{strings.recordingDone}</span>
              <span className="text-[10px] text-neutral-400 font-mono">
                {currentLanguage === 'kn' ? 'ಧ್ವನಿ ಟಿಪ್ಪಣಿ ದೂರಿಗೆ ಲಗತ್ತಿಸಲಾಗಿದೆ' : 'Audio Note Attached to Dispatch Ticket'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={startRecording}
              className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] transition flex items-center gap-1 font-medium"
            >
              <Mic className="w-3 h-3" />
              {currentLanguage === 'kn' ? 'ಮತ್ತೆ ರೆಕಾರ್ಡ್ ಮಾಡಿ' : 'Re-record'}
            </button>
            {onClearAudio && (
              <button
                type="button"
                onClick={onClearAudio}
                className="p-1.5 text-neutral-500 hover:text-red-400 transition"
                title={getUIString(currentLanguage, 'deleteAudio')}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Ready to record button */
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            {currentLanguage === 'kn'
              ? 'ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ (15 ಸೆಕೆಂಡು). ನಿಮ್ಮ ಧ್ವನಿ ತಾನಾಗಿಯೇ ಅಕ್ಷರ ರೂಪಕ್ಕೆ ಪರಿವರ್ತನೆಯಾಗುತ್ತದೆ.'
              : `Record a voice description in ${currentLangObj.label}. Speech will automatically transcribe into the report.`}
          </p>
          <button
            type="button"
            onClick={startRecording}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-xs font-semibold transition shrink-0"
          >
            <Mic className="w-3.5 h-3.5 text-emerald-400" />
            <span>{currentLanguage === 'kn' ? 'ಧ್ವನಿಯಲ್ಲಿ ಮಾತನಾಡಿ' : 'Record Voice'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
