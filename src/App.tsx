import { useEffect } from 'react'
import './App.css'
import { ChecksContainer } from './components/ChecksContainer'
import { useStore } from '@store'

function App() {
  const checks = useStore(state => state.checks)
  const { isLoading, hasError } = useStore(state => state.meta)
  const isValid = useStore(state => state.isValid)
  const getChecks = useStore(state => state.getChecks)

  useEffect(() => {
    void getChecks()
  }, [])

  return (
    <div className="App">
      <ChecksContainer
        checks={checks}
        isLoading={isLoading}
        hasError={hasError}
        isValid={isValid()}
      />
    </div>
  )
}

export default App
