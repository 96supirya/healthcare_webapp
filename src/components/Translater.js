// components/Translator.js
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { translateText } from '../services/api';

const languages = {
    "ar": "Arabic",
    "bg": "Bulgarian",
    "cs": "Czech",
    "da": "Danish",
    "de": "German",
    "el": "Greek",
    "en-us": "English",
    "es": "Spanish",
    "et": "Estonian",
    "fi": "Finnish",
    "fr": "French",
    "hu": "Hungarian",
    "id": "Indonesian",
    "it": "Italian",
    "ja": "Japanese",
    "ko": "Korean",
    "lt": "Lithuanian",
    "lv": "Latvian",
    "nb": "Norwegian Bokmål",
    "nl": "Dutch",
    "pl": "Polish",
    "pt-pt": "Portuguese",
    "ro": "Romanian",
    "ru": "Russian",
    "sk": "Slovak",
    "sl": "Slovenian",
    "sv": "Swedish",
    "tr": "Turkish",
    "uk": "Ukrainian",
    "zh-hans": "Chinese"
};

const target_lang = {
    "ar": "Arabic",
    "bg": "Bulgarian",
    "cs": "Czech",
    "da": "Danish",
    "de": "German",
    "el": "Greek",
    "en-us": "English",
    "es": "Spanish",
    "et": "Estonian",
    "fi": "Finnish",
    "fr": "French",
    "hu": "Hungarian",
    "id": "Indonesian",
    "it": "Italian",
    "ja": "Japanese",
    "ko": "Korean",
    "lt": "Lithuanian",
    "lv": "Latvian",
    "nb": "Norwegian Bokmål",
    "nl": "Dutch",
    "pl": "Polish",
    "pt-pt": "Portuguese",
    "ro": "Romanian",
    "ru": "Russian",
    "sk": "Slovak",
    "sl": "Slovenian",
    "sv": "Swedish",
    "tr": "Turkish",
    "uk": "Ukrainian",
    "zh-hans": "Chinese"
};


const Translator = () => {
    const [translatedText, setTranslatedText] = useState('');
    const [outputLanguage, setOutputLanguage] = useState('es');
    const [inputLanguage, setInputLanguage] = useState('auto');
    const { transcript, resetTranscript } = useSpeechRecognition();

    const handleTranslation = async () => {
        try {
            let from = inputLanguage
            if (inputLanguage === 'auto') {
                from = ''
            }
            else {
                from = inputLanguage
            }
            const response = await translateText(transcript, from, outputLanguage);
            setTranslatedText(response.data.translated_text);
        } catch (error) {
            console.error('Error translating:', error);
        }
    };

    const handleSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(translatedText);
        utterance.lang = outputLanguage;
        speechSynthesis.speak(utterance);
    };

    const handleReset = () => {
        resetTranscript();
        setTranslatedText('');
        setInputLanguage('auto');
        setOutputLanguage('es');
    }

    return (
        <div className="translator">
            <h2>Speak to Translate</h2>
            <div className="language">
                <label>Input Language: </label>
                <select
                    value={inputLanguage}
                    onChange={(e) => setInputLanguage(e.target.value)}
                >
                    <option value='auto'>Auto</option>
                    {Object.entries(languages).map(([code, name]) => (
                        <option key={code} value={code}>{name}</option>
                    ))}
                </select>
            </div>

            <button onClick={SpeechRecognition.startListening}>Start Speaking</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleTranslation}>Translate</button>
            <div>
                <h3 className='original_transcript'>Original Transcript:</h3>
                <p>{transcript}</p>
                <h3 className='original_text'>Translated Text:</h3>
                <p>{translatedText}</p>
                <button onClick={handleSpeak} className="speak">Speak Translation</button>
            </div>
            <div>
                <label>Output Language: </label>
                <select
                    value={outputLanguage}
                    onChange={(e) => setOutputLanguage(e.target.value)}
                >
                    {Object.entries(target_lang).map(([code, name]) => (
                        <option key={code} value={code}>{name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Translator;
