import { useState } from "react"
import axios from "axios"

function App() {

  const [task, setTask] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)

  const analyzeTask = async () => {

    if (!task) return

    setLoading(true)

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/ai/analyze",
        {
          task: task
        }
      )

      setAnalysis(response.data.analysis)

    } catch (error) {

      console.error(error)

      setAnalysis("Failed to analyze task.")

    }

    setLoading(false)
  }

  return (

    <div className="flex min-h-screen bg-[#0f172a] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] p-6 border-r border-gray-800">

        <h1 className="text-2xl font-bold mb-10">
          AI Ops Copilot
        </h1>

        <nav className="space-y-4">

          <div className="p-3 rounded-lg bg-blue-600">
            Dashboard
          </div>

          <div className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
            AI Analysis
          </div>

          <div className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
            Tasks
          </div>

          <div className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
            Reports
          </div>

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Header */}
        <div className="mb-8">

          <h2 className="text-4xl font-bold mb-2">
            Enterprise AI Dashboard
          </h2>

          <p className="text-gray-400">
            Monitor AI operations and analytics
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-[#1e293b] p-6 rounded-2xl">
            <h3 className="text-gray-400 mb-2">
              Total Tasks
            </h3>

            <p className="text-4xl font-bold">
              128
            </p>
          </div>

          <div className="bg-[#1e293b] p-6 rounded-2xl">
            <h3 className="text-gray-400 mb-2">
              AI Analyses
            </h3>

            <p className="text-4xl font-bold">
              42
            </p>
          </div>

          <div className="bg-[#1e293b] p-6 rounded-2xl">
            <h3 className="text-gray-400 mb-2">
              System Health
            </h3>

            <p className="text-4xl font-bold text-green-400">
              98%
            </p>
          </div>

        </div>

        {/* AI Panel */}
        <div className="bg-[#1e293b] p-8 rounded-2xl">

          <h3 className="text-2xl font-bold mb-6">
            AI Task Analyzer
          </h3>

          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter business task for AI analysis..."
            className="w-full h-40 bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-white outline-none"
          />

          <button
            onClick={analyzeTask}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
          >

            {
              loading ? "Analyzing..." : "Analyze Task"
            }

          </button>

          {/* AI Response */}
          {
            analysis && (

              <div className="mt-8 bg-[#0f172a] p-6 rounded-xl border border-gray-700">

                <h4 className="text-xl font-bold mb-4">
                  AI Analysis Result
                </h4>

                <pre className="whitespace-pre-wrap text-gray-300">
                  {analysis}
                </pre>

              </div>
            )
          }

        </div>

      </main>

    </div>
  )
}

export default App