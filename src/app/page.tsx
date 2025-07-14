import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"

export default function NotionCloneLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 w-full">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Tu espacio de trabajo
              <span className="block text-gray-400">conectado</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              WorkSpace une tus notas, documentos, tareas y conocimiento en una
              plataforma intuitiva. Organiza tu trabajo y colabora con tu equipo
              de manera más eficiente.
            </p>

            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Sin complicaciones, sin distracciones y sin logueos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="dashboard">
                <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-500 transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
                  Comenzar Gratis
                  <Icon
                    icon="material-symbols:arrow-right-alt-rounded"
                    className="w-5 h-5"
                  />
                </button>
              </Link>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 mx-auto max-w-4xl">
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Icon
                      icon="material-symbols:preview"
                      className="w-8 h-8 text-gray-200"
                    />
                  </div>
                  <p className="text-gray-300 text-lg">
                    Vista previa de la interfaz
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
     {/*  <section id="features" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Todo lo que necesitas para ser productivo
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Herramientas poderosas diseñadas para equipos modernos que buscan
              eficiencia y colaboración.
            </p>
          </div>
        </div>
      </section> */}
    </div>
  )
}
