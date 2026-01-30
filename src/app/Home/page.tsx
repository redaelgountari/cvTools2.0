import type { Metadata } from 'next'
import { ArrowRight, Check, Quote, Twitter, MapPin, Briefcase, Mail, Phone, Facebook, Instagram, Linkedin, Star, Bold } from 'lucide-react'
import Link from 'next/link'
import GradientButton from './GradientButton'

export const metadata: Metadata = {
  title: 'À propos - Clickexpert',
  description: 'Nous aidons les entreprises et les particuliers à simplifier leurs démarches légales grâce à des services numériques professionnels et personnalisés.',
}

export default function AboutPage() {
  return (
  <div className="min-h-screen text-[#1A1A1A] bg-white">
      <main>
        {/* Hero Section */}
        <div className="min-h-screen bg-[#45D1C9] py-12 md:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="ml-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center min-h-[calc(100vh-6rem)]">
              <div>
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="h-0.5 w-12 bg-[#FEE318]"></div>
                  <span className="text-yellow-300 text-sm font-semibold tracking-widest">
                    A PROPOS
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 md:mb-8">
                  À propos <span className="relative -top-8">,,</span>
                </h1>

                <p className="text-lg md:text-xl text-black leading-relaxed mb-8 md:mb-12 max-w-xl">
                  Nous aidons les entreprises et les particuliers à simplifier leurs démarches légales grâce à des services numériques professionnels et personnalisés.
                </p>
                <GradientButton text="Découvrez" />
              </div>

              <div className="relative flex justify-center items-center">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                  alt="Team collaboration illustration"
                  className="w-full max-w-md lg:max-w-2xl h-auto rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 lg:gap-44 items-center max-w-6xl">
              <div>
                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-2 block">Résultats</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ce que les chiffres<br />racontent</h2>
                <p className="text-gray-600 mb-8 max-w-md">
                  On mesure notre travail par ce qui reste. Des projets qui tiennent bon, des équipes qui grandissent, des clients qui reviennent.
                </p>
                <div className="flex flex-wrap gap-6 md:gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-lg mb-2 mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold">Fiabilité</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-lg mb-2 mx-auto">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold">Orientation client</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-lg mb-2 mx-auto">
                      <Star className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold">Innovation</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="border-l-2 border-black pl-6">
                  <div className="text-5xl md:text-6xl font-bold mb-1">10+</div>
                  <p className="text-sm font-bold">Années de pratique</p>
                  <p className="text-xs mt-1">Bâtir sans compromis, année après année.</p>
                </div>
                <div className="border-l-2 border-black pl-6">
                  <div className="text-5xl md:text-6xl font-bold mb-1">500+</div>
                  <p className="text-sm font-bold">Projets menés à terme</p>
                  <p className="text-xs mt-1">Des réalisations qui parlent d'elles-mêmes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Grid */}
        <div className="py-16 md:py-24 lg:py-32 flex items-center justify-center bg-white px-4 md:px-8 lg:px-16">
          <div className="w-full max-w-6xl">
            {/* Vision Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 relative">
              {/* Quote marks top left */}
              <div className="absolute hidden md:block" style={{
                width: '90px',
                height: '90px',
                left: '-15px',
                top: '-90px',
                zIndex: 10
              }}>
                <div style={{  strokeWidth: '2px', stroke: '#000', rotate: "180deg", fontSize:220, fontWeight:"Bold" }}>
                  ,,
                </div>
              </div>

              {/* Vision Text Card */}
              <div className="bg-[#FEE318] p-4 md:p-6 rounded-xl aspect-square flex items-center justify-center">
                <div className='p-2 md:p-4'>
                  <h2 className="font-bold text-2xl md:text-3xl lg:text-[40px] md:leading-[59px]">
                    Vision
                  </h2>
                  <br />
                  <p className="text-black text-sm md:text-base lg:text-[16px] leading-relaxed font-semibold">
                    Nous voulons devenir la plateforme de référence au Maroc pour l'accès facile, transparent et digitalisé aux services juridiques et administratifs — en permettant à chacun (entreprise ou particulier) d'obtenir un accompagnement professionnel, rapide et fiable pour toutes leurs démarches légales.
                  </p>
                </div>
              </div>

              {/* Vision Image Card */}
              <div className="bg-[#47D6D2] rounded-xl overflow-hidden relative aspect-square">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                    alt="Team collaboration illustration"
                    className="w-full h-full max-w-md rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 relative">
              {/* Mission Text Card */}
              <div className="bg-[#47D6D2] p-4 md:p-6 rounded-xl aspect-square flex items-center justify-center">
                <div className='p-2 md:p-4'>
                  <h2 className="font-bold text-2xl md:text-3xl lg:text-[40px] md:leading-[59px]">
                    Mission
                  </h2>
                  <br />
                  <p className="text-black text-sm md:text-base lg:text-[16px] leading-relaxed font-semibold">
                    Notre mission est d'offrir des solutions claires et accessibles pour la création d'entreprise, les formalités administratives et les besoins juridiques — dans le but de simplifier la vie de nos clients. Nous nous engageons à fournir un service professionnel, sécurisé et personnalisé, en combinant expertise juridique et approche digitale.
                  </p>
                </div>
              </div>

              {/* Mission Image Card */}
              <div className="bg-[#47D6D2] rounded-xl overflow-hidden relative aspect-square">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                    alt="Team collaboration illustration"
                    className="w-full h-full max-w-md rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Quote marks bottom right */}
              <div className="absolute hidden md:block" style={{
                width: '90px',
                height: '90px',
                right: '-50px',
                top: '-90px',
                zIndex: 10
              }}>
                <div style={{  strokeWidth: '2px', stroke: '#000', rotate: "180deg", fontSize:220, fontWeight:"Bold" }}>
                  ,,
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Section */}
        <div className="py-16 md:py-24 bg-white px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">Solution</h1>
              <p className="text-base md:text-lg text-black mb-4">
                Des experts qui maîtrisent chaque détail.
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
                solutions complètes et adaptées à vos besoins pour vous accompagner à chaque étape.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-16">
              <div className="bg-white rounded-3xl border-4 border-b-[10px] border-black p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                  Simplification des démarches
                </h3>
                <p className="text-sm md:text-base text-black leading-relaxed">
                  Nous vous accompagnons pour faciliter toutes vos procédures, avec un suivi clair et rapide pour éviter les complications administratives.
                </p>
              </div>

              <div className="bg-white rounded-3xl border-4 border-b-[10px] border-black p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                  Gain de temps & réduction de stress
                </h3>
                <p className="text-sm md:text-base text-black leading-relaxed">
                  Nous prenons en charge les tâches techniques afin que vous puissiez vous concentrer sur votre croissance et vos priorités.
                </p>
              </div>

              <div className="bg-white rounded-3xl border-4 border-b-[10px] border-black p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                  Accompagnement personnalisé
                </h3>
                <p className="text-sm md:text-base text-black leading-relaxed">
                  Chaque client profite d'un suivi sur mesure pour garantir la meilleure solution et des résultats concrets.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Avis */}
        <div className="py-16 md:py-24 bg-gray-50 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-400 mb-3">Section Avis</h1>
              <p className="text-gray-700 text-sm md:text-base">
                Découvrez les retours et témoignages de nos clients sur la qualité de nos services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-3xl border-4 border-black p-6 md:p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Jon Tucker</div>
                    <div className="text-sm text-gray-500">@JonTuckerUSA</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  « Ils savent ce qu'ils font et ils le font bien. »
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span className="text-lg">👍</span>
                  <span>Killer tool.</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl border-4 border-black p-6 md:p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Jon KIMI</div>
                      <div className="text-sm text-gray-500">@JonTuckerUSA</div>
                    </div>
                  </div>
                  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6">
                  The website is easy to navigate, and the product descriptions are very clear. My order arrived quickly—super happy
                </p>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">@getpostpilot</span>. Killer tool.
                </div>
              </div>

              <div className="bg-white rounded-3xl border-4 border-black p-6 md:p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">SALMA SALMA</div>
                      <div className="text-sm text-gray-500">@JonTuckerUSA</div>
                    </div>
                  </div>
                  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6">
                  Delivery times are too long. I was a bit
                </p>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">@getpostpilot</span>. Killer tool.
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <GradientButton />
            </div>
          </div>
        </div>

        {/* Carrières */}
        <div className="bg-white py-16 md:py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-2xl md:text-3xl font-bold mb-2">Carrières</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Nous recrutons</h1>
              <p className="text-sm md:text-base">
                Rejoignez une équipe qui bâtit pour durer, pas pour impressionner.
              </p>
            </div>

            <div className="border-t-4 border-[#4FD1C5] pt-8">
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h2 className="text-lg md:text-xl font-bold">Directeur stratégique</h2>
                    <span className="text-sm md:text-base font-medium bg-slate-200 p-1">Direction</span>
                  </div>

                  <p className="text-sm md:text-base mb-6">
                    Piloter la vision long terme, définir les orientations majeures.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">MAROC</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">CDI</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <GradientButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Question */}
        <div className="flex items-center justify-center py-16 md:py-24 px-4">
          <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-lg"
            style={{
              background: 'linear-gradient(to right, #47D6D2,#FFF8F0, #FEE318)'
            }}>
            <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-16 py-8 md:py-12 gap-6">
              <div className="flex-1">
                <p className="text-xs md:text-sm font-medium mb-2">
                  Contactez-nous dès aujourd'hui !
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                  Vous avez des questions sur<br />
                  nos services ou êtes prêt(e)<br />
                  à démarrer votre projet ?
                </h2>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto md:ml-8">
                <input
                  type="email"
                  placeholder="Tapez votre email"
                  className="px-4 md:px-6 py-3 md:py-4 rounded-lg border-2 border-black bg-white text-black placeholder-gray-600 font-medium w-full md:w-64"
                />
                <button className="px-4 md:px-6 py-3 md:py-4 rounded-lg bg-black text-white font-semibold">
                  Commencer
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div> 
  )
}
