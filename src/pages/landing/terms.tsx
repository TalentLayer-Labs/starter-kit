import Image from 'next/image';
import { useState } from 'react';
import { IntroducationSecion } from '../../components/introduction-section';

function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='bg-white text-black'>
      <header className='navbar fixed top-0 left-0 z-50 w-full border-stroke bg-white duration-300'>
        <div className='container relative lg:max-w-[1305px] lg:px-10'>
          <div className='flex items-center justify-between'>
            <div className='block py-4 lg:py-0'>
              <a href='index.html' className='block max-w-[145px] sm:max-w-[180px]'>
                <Image src='/logo-text-dark.png' alt='logo' width={125} height={15} />
              </a>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className='navbarOpen absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center space-y-[6px] font-bold lg:hidden'
              aria-label='navbarOpen'
              name='navbarOpen'>
              <span className='block h-[2px] w-7 bg-black '></span>
              <span className='block h-[2px] w-7 bg-black '></span>
              <span className='block h-[2px] w-7 bg-black '></span>
            </button>

            <div
              className={`menu-wrapper relative ${isOpen ? '' : 'hidden'} justify-between lg:flex`}>
              <button
                onClick={() => setIsOpen(false)}
                className='navbarClose fixed top-10 right-10 z-[9999] flex h-10 w-10 flex-col items-center justify-center font-bold lg:hidden'
                name='navbarClose'
                aria-label='navbarClose'>
                <span className='block h-[2px] w-7 rotate-45 bg-black '></span>
                <span className='-mt-[2px] block h-[2px] w-7 -rotate-45 bg-black '></span>
              </button>

              <nav className='fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-white bg-opacity-95 text-center backdrop-blur-sm lg:static lg:h-auto lg:w-max lg:bg-transparent lg:backdrop-blur-none '>
                <ul className='items-center space-y-3 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-10'>
                  <li className='menu-item'>
                    <a
                      onClick={() => setIsOpen(false)}
                      href='#video'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      about
                    </a>
                  </li>
                  <li className='menu-item'>
                    <a
                      onClick={() => setIsOpen(false)}
                      href='#features'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      features
                    </a>
                  </li>
                  <li className='menu-item'>
                    <a
                      onClick={() => setIsOpen(false)}
                      href='#pricing'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      pricing
                    </a>
                  </li>
                  <li className='menu-item'>
                    <a
                      onClick={() => setIsOpen(false)}
                      href='#contact'
                      className='menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7'>
                      support
                    </a>
                  </li>
                  <li>
                    <a
                      href='/onboarding'
                      className='rounded-md text-center bg-landingprimary py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base font-bold text-white hover:bg-opacity-60'>
                      register
                    </a>
                  </li>
                  <li>
                    <a
                      href='/onboarding'
                      className='rounded-md text-center bg-redpraha py-[6px] px-[12px] xl:py-[10px] xl:px-[30px] text-base font-bold text-stone-800 hover:bg-opacity-60'>
                      contribute
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id='features' className='relative lg:pt-[110px]'>
          <div className='container'>
            <div
              className='wow fadeInUp mx-auto mb-14 max-w-[690px] lg:mb-[70px]'
              data-wow-delay='.2s'>
              <h2 className='mb-4 text-3xl font-bold text-black text-center  sm:text-4xl pt-40 md:text-[44px] leading-tight'>
                terms of service
              </h2>
              <div className='pt-20 text-justify'></div>
              <p className='pb-5'>
                Forty Four Labs OU and/or its&rsquo; affiliates (&ldquo;BuilderPlace&rdquo;) is
                granting access to the SAAS product (&ldquo;The Product&rdquo;) to you as the
                individual, company, or legal entity (&ldquo;The Customer&rdquo;) on the condition
                that you accept all of the terms of this (&ldquo;Terms of Service&rdquo;,
                &ldquo;TOS&rdquo;) as defined below. This TOS constitutes a legal and enforceable
                contract between The Customer and BuilderPlace. By using BuilderPlace and related
                services you implicitly agree to this Terms of Service. If The Customer does not
                agree to this Terms of Service, they should make no further use of The Product.
              </p>

              <p className='pb-2 font-bold text-landingprimary'>Ownership</p>
              <p className='pb-5'>
                The Customer acknowledges that BuilderPlace is an open-source product and use of The
                Product does not convey any rights to intellectual property
              </p>

              <p className='pb-2 font-bold text-landingprimary'>Data Privacy</p>
              <p className='pb-5'>
                By engaging with The Product, The Customer consents to BuilderPlace storing account
                information on their behalf. BuilderPlace is compliant with GDPR regulatory
                requirements. If you intend to initiate a Right of Access Request please contact our
                team at the following email info@builder.place.
              </p>

              <p className='pb-2 font-bold text-landingprimary'>Taxes</p>
              <p className='pb-5'>
                The Customer commits to maintaining the proper tax filings relating to payments to
                or from The Customer relating to labor agreements (&ldquo;Work&rdquo;) conducted
                through The Product. BuilderPlace will be not be held liable for improper tax
                filings of The Customer or it&rsquo;s affiliates.
              </p>

              <p className='pb-2 font-bold text-landingprimary'>Payments</p>
              <p className='pb-5'>
                A 2% fee will be levied on payments handled through the BuilderPlace escrow system
                (Escrow). Fees are automatically withdrawn from final amounts released from Escrow.
              </p>

              <p className='pb-2 font-bold text-landingprimary'>Term</p>
              <p className='pb-5'>
                This Terms of Service will be effective upon The Customer&rsquo;s first access of
                The Product and shall remain in force during the applicable throughout The
                Customer&rsquo;s continued use of The Product, as applicable
              </p>

              <p className='pb-2 font-bold text-landingprimary'>Governing Law and Jurisdiction</p>
              <p className='pb-5'>
                The governing jurisdiction for this contract is Estonia. Each Party agrees to the
                applicable governing law below without regard to choice or conflicts of law rules,
                and to the exclusive jurisdiction of the applicable courts below with respect to any
                dispute, claim, action, suit or proceeding (including non-contractual disputes or
                claims) arising out of or in connection with this Terms of Service, or its subject
                matter or formation. To the extent not prohibited by applicable law, each of the
                Parties hereby irrevocably waives any and all right to trial by jury in any legal
                proceeding arising out of or related to this Terms of Service.
              </p>
              <p className='pb-2 font-bold text-landingprimary'>Waiver</p>
              <p className='pb-5'>
                Waiver The Customer agrees that neither they, nor any person, organization, or any
                other entity acting on his behalf will file, charge, claim, sue BuilderPlace or
                permit to be filed, charged or claimed, any action for damages or other relief
                (including injunctive, declaratory, monetary relief or other) against BuilderPlace,
                involving any matter occurring in the past up to the date of this Terms of Service
                or involving any continuing effects of actions or practices which arose prior to the
                date of this Terms of Service, or involving and based upon any claims, demands,
                causes of action, obligations, damages or liabilities which are the subject of these
                Terms of Service.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className='wow fadeInUp bg-redpraha py-7' data-wow-delay='.2s'>
          <div className='container text-center max-w-[1390px]'>
            <div className='flex justify-center flex-wrap'>
              <div className='order-last w-full text-center px-3 lg:order-first lg:w-1/3'>
                <p className='text-center text-base text-stone-800'>
                  &copy; 2023 BuilderPlace |{' '}
                  <a href='#' className='underline'>
                    Terms of Service
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
