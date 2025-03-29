
const PLACEHOLDER_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ante eu nunc elementum commodo. In egestas urna ut leo suscipit elementum. Duis orci neque, congue et ex ultricies, malesuada convallis nisl. Nunc tincidunt id neque sit amet semper. Maecenas vel sapien velit. Nunc sed ante eget ante finibus blandit. Suspendisse dignissim dolor a ante congue placerat. Vivamus tempor, metus sit amet feugiat ultricies, lacus lacus rhoncus diam, vitae imperdiet ex nibh at massa. Pellentesque tincidunt tortor eget justo tincidunt tincidunt. Curabitur ut leo porta, imperdiet neque nec, consequat orci. Sed accumsan sodales lacus, id semper velit blandit eu.`

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-red-200">
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">MiApp</div>
        <div className="flex items-center space-x-4">
          <span className="hidden sm:block">Usuario</span>
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Pro</span>
          <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Cerrar sesión</button>
        </div>
      </nav>
      <main className="p-6 h-full bg-green-200 flex flex-col">
        <h1 className="text-5xl w-full text-center">💡 Idea Millonaria o Estafa Piramidal? ¡Descúbrelo! 💰🚀</h1>
        <p className="mx-auto my-2">
          Escribe tu idea y nuestra Inteligencia Artificial la analizará 👓. Recibirás un veredicto brutalmente honesto:
        </p>
        <b className="mx-auto my-2 text-xl">
        🤑 "Idea Millonaria" o 🏴‍☠️ "Estafa Piramidal".
        </b>
        <p className="mx-auto my-2">
          ¡Evita fraudes y encuentra la próxima gran oportunidad! 😎
        </p>
        <section className="flex flex-col flex-grow items-center justify-center h-auto bg-blue-200">
          <label htmlFor="" className="">Escribe tu idea</label>
          <textarea id="" className=" bg-white w-full h-52 max-w-lg p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={PLACEHOLDER_TEXT}></textarea>
          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 w-100">Veredicto!</button>
        </section>
      </main>
    </div>
  );
}
