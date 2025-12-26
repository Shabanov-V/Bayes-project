import React, { useEffect, useCallback, useState } from 'react';
import { HypothesisCard } from './components/HypothesisPanel/HypothesisCard';
import { useScenario } from './hooks/useScenario';
import { useCalculations } from './hooks/useCalculations';
import { EvidenceCard } from './components/Evidence/EvidenceCard';
import { AddEvidenceButton } from './components/Evidence/AddEvidenceButton';
import { PriorProbabilityControl } from './components/HypothesisPanel/PriorProbabilityControl';
import { CalculationsPanel } from './components/Calculations/CalculationsPanel';
import { PresetDropdown } from './components/Header/PresetDropdown';
import { SaveButton } from './components/Header/SaveButton';
import { ShareButton } from './components/Header/ShareButton';
import { HelpModal } from './components/Header/HelpModal';
import { saveScenario, loadCurrentScenario, listScenarios, deleteScenario } from './lib/storage';
import { BUILT_IN_PRESETS } from './lib/presets';
import { generateShareUrl, decodeScenario } from './hooks/useShareUrl';
import { useToast } from './components/UI/Toast';
import { debounce } from './lib/utils';

function App() {
  const { state, dispatch } = useScenario();
  const { h1Probability, h2Probability, steps } = useCalculations(state);
  const { addToast } = useToast();
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  // Auto-save the current scenario to local storage on state change
  const debouncedSave = useCallback(debounce(saveScenario, 500), []);
  useEffect(() => {
    debouncedSave(state);
  }, [state, debouncedSave]);

  // Load scenario on initial render
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scenarioParam = urlParams.get('scenario');

    if (scenarioParam) {
      const decodedScenario = decodeScenario(scenarioParam);
      if (decodedScenario) {
        dispatch({ type: 'LOAD_SCENARIO', payload: decodedScenario });
        addToast('Scenario loaded from URL!', 'success');
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      } else {
        addToast('Invalid share link.', 'error');
      }
    }

    const savedScenario = loadCurrentScenario();
    if (savedScenario) {
      dispatch({ type: 'LOAD_SCENARIO', payload: savedScenario });
    } else {
      dispatch({ type: 'LOAD_SCENARIO', payload: BUILT_IN_PRESETS[0] });
    }
  }, [dispatch, addToast]);

  const handleSave = () => {
    const name = prompt('Enter a name for your scenario:');
    if (name) {
      const newState = { ...state, name };
      dispatch({ type: 'LOAD_SCENARIO', payload: newState });
      saveScenario(newState);
      addToast('Scenario saved!', 'success');
    }
  };

  const handleShare = () => {
    const url = generateShareUrl(state);
    navigator.clipboard.writeText(url).then(() => {
      addToast('Link copied to clipboard!', 'success');
    }, () => {
      addToast('Failed to copy link.', 'error');
    });
  };

  const userScenarios = listScenarios();

  return (
    <div className="bg-background min-h-screen text-white">
      <header className="p-4 border-b border-border flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Bayesian Reasoning Tool</h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <SaveButton onSave={handleSave} />
          <ShareButton onShare={handleShare} />
          <PresetDropdown
            userScenarios={userScenarios}
            onLoad={(scenario) => dispatch({ type: 'LOAD_SCENARIO', payload: scenario })}
            onDelete={deleteScenario}
          />
          <button onClick={() => setIsHelpVisible(true)} className="p-2">?</button>
        </div>
      </header>
      <main className="p-4 sm:p-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-stretch mb-8 gap-4 sm:gap-8">
          <HypothesisCard
            text={state.hypotheses.h1}
            onTextChange={(value) =>
              dispatch({ type: 'UPDATE_HYPOTHESIS', payload: { h: 'h1', value } })
            }
            color="blue"
            probability={h1Probability}
          />
          <div className="text-2xl self-center">vs</div>
          <HypothesisCard
            text={state.hypotheses.h2}
            onTextChange={(value) =>
              dispatch({ type: 'UPDATE_HYPOTHESIS', payload: { h: 'h2', value } })
            }
            color="purple"
            probability={h2Probability}
          />
        </div>
        <PriorProbabilityControl
          value={state.priorProbability}
          onUpdate={(value) => dispatch({ type: 'UPDATE_PRIOR', payload: value })}
        />
        <div className="mt-8">
          {state.evidence.length > 0 ? (
            state.evidence.map((evidence, index) => {
              const step = steps[index];
              const probBefore = index === 0 ? state.priorProbability : steps[index - 1].probabilityAfter.h1;
              const probAfter = step ? step.probabilityAfter.h1 : probBefore;
              const impact = probAfter - probBefore;

              return (
                <EvidenceCard
                  key={evidence.id}
                  evidence={evidence}
                  onUpdate={(id, newValues) =>
                    dispatch({ type: 'UPDATE_EVIDENCE', payload: { id, newValues } })
                  }
                  onDelete={(id) => dispatch({ type: 'REMOVE_EVIDENCE', payload: id })}
                  impact={impact}
                />
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Add your first piece of evidence to begin</p>
            </div>
          )}
          <AddEvidenceButton onClick={() => dispatch({ type: 'ADD_EVIDENCE' })} />
        </div>
        <CalculationsPanel steps={steps} priorProbability={state.priorProbability} />
      </main>
      {isHelpVisible && <HelpModal onClose={() => setIsHelpVisible(false)} />}
    </div>
  );
}

export default App;