import { Icon } from "@iconify/react/dist/iconify.js"
import EditorHome from "../components/editors/EditorHome"
import Link from "next/link"
import { useTheme } from "next-themes"

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:to-gray-800 w-full transition-all duration-300">
      <title>Anotado | Inicio</title>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
              Tu espacio de trabajo
              <span className="block text-gray-600 dark:text-gray-400">
                conectado
              </span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
              WorkSpace une tus notas, documentos, tareas y conocimiento en una
              plataforma intuitiva. Organiza tu trabajo y colabora con tu equipo
              de manera más eficiente.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
              Sin complicaciones, sin distracciones y sin logueos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
                Comenzar
                <Icon
                  icon="material-symbols:arrow-right-alt-rounded"
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mx-auto max-w-4xl transition-all duration-300">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 rounded-xl h-96 flex items-center justify-center transition-all duration-300">
                <EditorHome />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage