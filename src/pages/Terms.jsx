import { Link } from 'react-router-dom'

function Terms() {
  return (
    <div className="bg-white min-h-screen text-black">
      <nav className="bg-[#1C1A17] px-5 lg:px-12 py-4 flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-base tracking-tight">
          Ecom<span className="text-[#E8642A]">Boost</span> AI
        </Link>
        <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">← Volver</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-5 py-12 lg:py-16">
        <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">Legal</p>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Términos y Condiciones</h1>
        <p className="text-xs text-gray-400 mb-10">Última actualización: junio 2026</p>

        <div className="flex flex-col gap-8 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-black mb-2">1. Aceptación de los términos</h2>
            <p>Al acceder y usar EcomBoost AI, aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo, por favor no uses el servicio.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">2. Descripción del servicio</h2>
            <p>EcomBoost AI es una plataforma de herramientas de inteligencia artificial diseñadas para ayudar a emprendedores de eCommerce. Las herramientas incluyen: generador de anuncios, SEO de producto, analizador de nicho, branding instantáneo y plan de lanzamiento.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">3. Acceso y licencia</h2>
            <p>Al realizar la compra única de $29, adquieres una licencia personal, no exclusiva e intransferible para usar EcomBoost AI de forma ilimitada. No puedes revender, redistribuir ni sublicenciar el acceso.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">4. Política de reembolso</h2>
            <p>Ofrecemos una garantía de devolución de 30 días. Si no estás satisfecho con el producto por cualquier motivo, contacta con nosotros en <a href="mailto:cyntiazebaze@gmail.com" className="text-[#E8642A] hover:underline">cyntiazebaze@gmail.com</a> dentro de los primeros 30 días y te devolveremos el importe íntegro sin preguntas.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">5. Uso aceptable</h2>
            <p>Te comprometes a usar EcomBoost AI únicamente para fines legales y legítimos. Queda prohibido:</p>
            <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
              <li>Usar el servicio para generar contenido fraudulento, engañoso o ilegal.</li>
              <li>Intentar acceder a sistemas no autorizados o vulnerar la seguridad del servicio.</li>
              <li>Automatizar el uso del servicio de forma masiva sin autorización expresa.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">6. Contenido generado por IA</h2>
            <p>El contenido generado por las herramientas de IA es orientativo. EcomBoost AI no garantiza resultados específicos de ventas, posicionamiento o rentabilidad. El usuario es responsable de revisar y adaptar el contenido generado antes de usarlo.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">7. Limitación de responsabilidad</h2>
            <p>EcomBoost AI no se hace responsable de pérdidas económicas, daños directos o indirectos derivados del uso del servicio. La responsabilidad máxima en cualquier caso estará limitada al importe pagado por el usuario.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">8. Modificaciones del servicio</h2>
            <p>Nos reservamos el derecho de modificar, mejorar o discontinuar funcionalidades del servicio. Comunicaremos cambios significativos con antelación razonable.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">9. Ley aplicable</h2>
            <p>Estos términos se rigen por la legislación española. Para cualquier disputa, las partes se someten a los juzgados y tribunales competentes según la normativa aplicable.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">10. Contacto</h2>
            <p>Para cualquier consulta sobre estos términos: <a href="mailto:cyntiazebaze@gmail.com" className="text-[#E8642A] hover:underline">cyntiazebaze@gmail.com</a></p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Terms
