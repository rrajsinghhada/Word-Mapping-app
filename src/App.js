import React, { useState, useEffect } from 'react';
import './App.css';

const TextComparison = () => {
  const [inputText, setInputText] = useState(`
    Sarah had been experiencing frequent headaches, dizziness, and a sense of heaviness in her head for a couple of months. These symptoms began gradually, and she initially thought they were due to stress and lack of sleep. As the symptoms persisted, Sarah became increasingly concerned, especially when the headaches started affecting her ability to concentrate at work and interfered with her social life. She decided to make an appointment with her general practitioner, Dr. Johnson, to get to the bottom of what was happening. After a detailed discussion of her symptoms, Dr. Johnson recommended several tests to rule out possible underlying conditions. These tests included a CT scan of the brain, an eye exam to check for vision problems, and a blood test to assess her overall health.
  
    The CT scan came back clear, which was a relief, but the eye exam revealed that Sarah had slight astigmatism in both eyes. Dr. Johnson suggested that this might be contributing to her headaches and recommended corrective glasses to alleviate the strain on her eyes. However, after wearing the glasses for a couple of weeks, Sarah noticed little to no improvement in her symptoms. She continued to experience headaches, dizziness, and a persistent fogginess that made it difficult for her to focus during the day. Concerned that something more serious might be at play, she returned to Dr. Johnson for further evaluation.

    Dr. Johnson referred Sarah to a neurologist, Dr. Patel, who conducted a series of more advanced tests, including an MRI of the brain and a lumbar puncture to check for signs of any neurological conditions. The MRI scan did not show any signs of brain tumors or other serious abnormalities, but the lumbar puncture revealed elevated pressure in her cerebrospinal fluid. This finding raised concerns about the possibility of idiopathic intracranial hypertension (IIH), a condition where the pressure inside the skull increases without any obvious cause. Dr. Patel ordered additional tests to rule out other potential causes, including blood work to check for underlying autoimmune conditions and a thorough review of Sarah's medical history.

    The results showed that Sarah had a mild form of IIH, which was likely the cause of her headaches and dizziness. Dr. Patel explained that IIH can sometimes occur in overweight individuals, especially women, and is often associated with obesity and other factors such as hormonal changes or certain medications. Sarah was advised to lose weight, adopt a healthier diet, and reduce stress levels to help manage her condition. Additionally, Dr. Patel prescribed a medication to reduce the pressure in her skull, which would help alleviate the symptoms.

    Sarah was initially overwhelmed by the diagnosis, as she had never heard of IIH before and was unsure of what the future held. However, after discussing her treatment options with Dr. Patel, she felt more confident in her ability to manage the condition. Over the next few months, Sarah followed the prescribed treatment plan, which included medication, regular check-ups, and lifestyle changes such as exercise and stress reduction techniques. Gradually, her symptoms began to improve, and she started to feel better both physically and mentally. Though she still had to be mindful of her condition, Sarah was able to return to her normal routine and continue her career and social activities.

    As Sarah's condition stabilized, Dr. Patel emphasized the importance of ongoing monitoring to ensure that the pressure in her skull remained under control. Sarah was scheduled for regular follow-up appointments to track her progress and adjust her treatment plan as needed. She was also encouraged to maintain a healthy weight, stay active, and continue using stress management techniques to reduce the likelihood of future flare-ups. Sarah learned to be proactive about her health and adopted a more balanced approach to life, focusing on maintaining her well-being while managing her condition. Although it took time for her to fully adjust, Sarah felt empowered by the knowledge she had gained about her condition and the steps she could take to keep it under control.
  `);

  const [outputText, setOutputText] = useState(`Sarah had persistent headaches, dizziness, and fogginess, which were initially attributed to stress. After eye exams and a CT scan revealed no major issues, Sarah visited a neurologist, who diagnosed her with idiopathic intracranial hypertension (IIH) based on elevated cerebrospinal fluid pressure. The condition, often linked to obesity, was treated with medication to reduce pressure and lifestyle changes. Over time, Sarah"s symptoms improved with ongoing monitoring, exercise, a balanced diet, and stress management. She learned to manage her condition and returned to her normal routine, with regular check-ups to ensure continued health.`);

  const [wordMapping, setWordMapping] = useState({});
  const [sentenceMapping, setSentenceMapping] = useState({});
  const [wordCycleIndices, setWordCycleIndices] = useState({});
  const [sentenceCycleIndices, setSentenceCycleIndices] = useState({});

  // Create word and sentence mappings
  useEffect(() => {
    const createMappings = () => {
      const inputWords = inputText.split(/\s+/);
      const outputWords = outputText.split(/\s+/);
      const inputSentences = inputText.split(/(?<=[.!?])\s+/);
      const outputSentences = outputText.split(/(?<=[.!?])\s+/);

      const wordMap = {};
      const sentenceMap = {};

      outputWords.forEach((word, outputIndex) => {
        wordMap[outputIndex] = [];
        inputWords.forEach((inputWord, inputIndex) => {
          if (word === inputWord) {
            wordMap[outputIndex].push(inputIndex);
          }
        });
      });

      outputSentences.forEach((sentence, outputIndex) => {
        sentenceMap[outputIndex] = [];
        inputSentences.forEach((inputSentence, inputIndex) => {
          if (sentence === inputSentence) {
            sentenceMap[outputIndex].push(inputIndex);
          }
        });
      });

      setWordMapping(wordMap);
      setSentenceMapping(sentenceMap);
      setWordCycleIndices({});
      setSentenceCycleIndices({});
    };

    createMappings();
  }, [inputText, outputText]);

  const handleWordClick = (outputIndex) => {
    const positions = wordMapping[outputIndex] || [];
    if (positions.length > 0) {
      const currentIndex = wordCycleIndices[outputIndex] || 0;
      const nextIndex = (currentIndex + 1) % positions.length;
      const inputIndex = positions[currentIndex];
      const inputElement = document.getElementById(`input-word-${inputIndex}`);
      if (inputElement) {
        inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        inputElement.classList.add('highlight');
        setTimeout(() => inputElement.classList.remove('highlight'), 1000);
      }
      setWordCycleIndices({ ...wordCycleIndices, [outputIndex]: nextIndex });
    }
  };

  const handleSentenceClick = (outputIndex) => {
    const positions = sentenceMapping[outputIndex] || [];
    if (positions.length > 0) {
      const currentIndex = sentenceCycleIndices[outputIndex] || 0;
      const nextIndex = (currentIndex + 1) % positions.length;
      const inputIndex = positions[currentIndex];
      const inputElement = document.getElementById(`input-sentence-${inputIndex}`);
      if (inputElement) {
        inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        inputElement.classList.add('highlight');
        setTimeout(() => inputElement.classList.remove('highlight'), 1000);
      }
      setSentenceCycleIndices({ ...sentenceCycleIndices, [outputIndex]: nextIndex });
    }
  };

  return (
    <div className="text-comparison-container">
      <div className="text-box">
        <h2>Input Text</h2>
        <div>
          {inputText.split(/\s+/).map((word, index) => (
            <span key={index} id={`input-word-${index}`} className="word">{word} </span>
          ))}
        </div>
        <div>
          {inputText.split(/(?<=[.!?])\s+/).map((sentence, index) => (
            <div key={index} id={`input-sentence-${index}`} className="sentence">
              {sentence}
            </div>
          ))}
        </div>
      </div>

      <div className="text-box">
        <h2>Output Text</h2>
        <div>
          {outputText.split(/\s+/).map((word, index) => (
            <span key={index} onClick={() => handleWordClick(index)} className="word">
              {word} 
            </span>
          ))}
        </div>
        <div>
          {outputText.split(/(?<=[.!?])\s+/).map((sentence, index) => (
            <div key={index} onClick={() => handleSentenceClick(index)} className="sentence">
              {sentence}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextComparison;
