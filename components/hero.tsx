export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
      💡 <b>Idea Millonaria</b> o <b>Estafa Piramidal</b>? ¡Descúbrelo! 💰🚀
      </p>
      <p className="mx-auto text-2xl text-center">
          Escribe tu idea y nuestra Inteligencia Artificial la analizará 👓. Recibirás un veredicto brutalmente honesto
      </p>
      <p className="mx-auto text-2xl text-center">
          ¡Evita fraudes y encuentra la próxima gran oportunidad! 😎
        </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
