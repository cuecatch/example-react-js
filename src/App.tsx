import { useEffect, useRef, useState } from 'react';
import './App.css';
import localExample from './example.json';

function App() {
  const surveys: Record<string, unknown> = {
    survey1: 'https://raw.githubusercontent.com/cuecatch/examples/main/examples/inputs/source.json',
    survey2: 'https://raw.githubusercontent.com/cuecatch/examples/main/examples/style/source.json',
    local: JSON.stringify(localExample),
  };

  const [sourceName, setSourceName] = useState('survey1');

  const surveySource = surveys[sourceName];
  const surveyElement = useRef<{ src: unknown; api: { reset: () => void; goNext: () => void; goPrev: () => void } }>();

  const onSurveyChange = (event: Event) => {
    const customEventDetail = (event as CustomEvent).detail;
    console.log(customEventDetail);
  };

  const resetSurvey = () => {
    surveyElement.current?.api.reset();
  };
  const goNext = () => {
    surveyElement.current?.api.goNext();
  };
  const goPrev = () => {
    surveyElement.current?.api.goPrev();
  };

  const setDataToInstance = () => {
    if (surveyElement.current) {
      surveyElement.current.src = localExample;
    }
  };

  useEffect(() => {
    window.addEventListener('cuechange', onSurveyChange);
    return () => {
      window.removeEventListener('cuechange', onSurveyChange);
    };
  }, [sourceName, onSurveyChange]);

  return (
    <>
      <h1 className="title">React.js Integration Example</h1>
      <div className="layout">
        <div className="button-group">
          <h3>Load Survey</h3>
          <button onClick={() => setSourceName('survey1')}>Remote JSON 1</button>
          <button onClick={() => setSourceName('survey2')}>Remote JSON 2</button>
          <button onClick={() => setSourceName('local')}>Local JSON attr</button>
          <button onClick={() => setDataToInstance()}>Local JSON prop</button>
          <h3>API interactions</h3>
          <button onClick={() => resetSurvey()}>Reset</button>
          <button onClick={() => goPrev()}> &#8592; Prev</button>
          <button onClick={() => goNext()}> &#8594; Next</button>
        </div>
        <div className="survey-container">
          <cue-catch ref={surveyElement} cache="memory" src={surveySource} />
        </div>
      </div>
    </>
  );
}

export default App;
