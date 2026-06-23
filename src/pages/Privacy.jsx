import { Link } from 'react-router-dom'

function Privacy() {
  return (
    <div className="bg-white min-h-screen text-black">
      <nav className="bg-[#1C1A17] px-5 lg:px-12 py-4 flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-base tracking-tight">
          Zebcy<span className="text-[#E8642A]">Tec</span>
        </Link>
        <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">← Volver</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-5 py-12 lg:py-16">
        <p className="text-[10px] font-semibold tracking-widest text-[#9c3c14] uppercase mb-2">Legal</p>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Política de Privacidad</h1>
        <p className="text-xs text-gray-400 mb-10">Última actualización: junio 2026</p>

        <div className="flex flex-col gap-8 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-black mb-2">1. Responsable del tratamiento</h2>
            <p>ZebcyTec es responsable del tratamiento de los datos personales que nos facilitas a través de este sitio web. Si tienes alguna duda, puedes contactarnos en <a href="mailto:cyntiazebaze@gmail.com" className="text-[#E8642A] hover:underline">cyntiazebaze@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">2. Datos que recopilamos</h2>
            <p>Recopilamos únicamente los datos que tú nos proporcionas voluntariamente:</p>
            <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
              <li><strong>Dirección de email</strong> — cuando te unes a la lista de espera o realizas una compra.</li>
              <li><strong>Datos de pago</strong> — gestionados íntegramente por Gumroad. No almacenamos datos de tarjeta.</li>
              <li><strong>Datos de uso</strong> — el texto que introduces en las herramientas de IA se envía a la API de Anthropic para generar resultados. No se almacena en nuestros servidores.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">3. Finalidad del tratamiento</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Enviar comunicaciones relacionadas con el lanzamiento del producto (lista de espera).</li>
              <li>Procesar y gestionar tu compra a través de Gumroad.</li>
              <li>Mejorar la experiencia y funcionalidades de ZebcyTec.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">4. Base legal</h2>
            <p>El tratamiento de tus datos se basa en tu consentimiento expreso al registrarte o realizar una compra, y en la ejecución del contrato de compraventa.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">5. Conservación de datos</h2>
            <p>Conservamos tus datos el tiempo necesario para cumplir con la finalidad para la que fueron recogidos, o mientras no solicites su eliminación.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">6. Tus derechos</h2>
            <p>Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición y portabilidad escribiéndonos a <a href="mailto:cyntiazebaze@gmail.com" className="text-[#E8642A] hover:underline">cyntiazebaze@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">7. Servicios de terceros</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li><strong>Mailchimp</strong> — gestión de la lista de correo.</li>
              <li><strong>Gumroad</strong> — procesamiento de pagos.</li>
              <li><strong>Anthropic</strong> — generación de contenido con IA.</li>
              <li><strong>Vercel</strong> — alojamiento de la aplicación.</li>
            </ul>
            <p className="mt-2">Cada uno de estos proveedores tiene su propia política de privacidad.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-2">8. Cookies</h2>
            <p>Este sitio no utiliza cookies propias de seguimiento. Algunos servicios de terceros (como Google Analytics, si está activado) pueden usar cookies técnicas para el análisis de uso.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Privacy
