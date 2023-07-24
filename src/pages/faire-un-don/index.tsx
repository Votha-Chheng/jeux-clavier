import React, { ChangeEvent, FC, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { poppins } from '@/fonts/poppins'
import { roboto } from '@/fonts/roboto'
import Link from 'next/link'
import emailjs from '@emailjs/browser';
import styled from 'styled-components'
import { ColorRing } from 'react-loader-spinner';
import { lato } from '@/fonts/lato';
import Image from 'next/image';
import BackToMenu from '@/components/shared-UI/BackToMenu';

const FaireUnDon: FC = () => {
  const [nomPrenom, setNomPrenom] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [emailSent, setEmailSent] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)

  const form = useRef<HTMLFormElement>(null)

  const submitMessage = async(event:SyntheticEvent) => {
    event.preventDefault()
    
    if(form.current){
      setEmailError(false)
      setLoading(true)
      const result = await emailjs.sendForm(process.env.NEXT_PUBLIC_SERVICE_ID as string, process.env.NEXT_PUBLIC_TEMPLATE_ID as string, form.current, process.env.NEXT_PUBLIC_PUBLIC_KEY)

      if(result.text === "OK"){
        setEmailSent(true)
        setEmail("")
        setNomPrenom("")
        setMessage("")
        setEmailSent(true)
        console.log(result.text)

      } else {
        setEmailError(true)
        console.log("Une erreur est survenue.");
      }
      setLoading(false)
    }
  }

  return (
    <ContactPageContainer>
      <BackToMenu/>
      <h2 className={roboto.className}>Pourquoi ce site ?</h2>
      <p className={poppins.className}>
        Mon prénom est Votha, et je travaille depuis maintenant plus de 5 ans en tant qu'intervenant informatique auprès de classes en maternelle et en primaire, et j'ai pu constater l'importance grandissante de la place d l'importance de la place de l'apprentissage et surtout de la prise en main des outils de l'informatique et plus spécifiquement la souris et le clavier. Les activités du site sont conçus sans aucune forme de challenge ou de compétition, et ne servent qu'à l'entraînement. Suivant de futures besoins que j'aurais constaté (ou que vous pouvez me faire parvenir via le formulaire de contact), les activités évolueront ou d'autres seront ajoutées.
      </p>
      <p className={poppins.className + " last"}>
        Ayant travaillé dans une école avec une connexion internet, disons-le, tout bonnement horrible, le poids du site extrêment léger permet un chargement rapide, même en cas de débit très lent.
      </p>
      <h2 className={roboto.className}>Faire un don</h2>
      <p className={poppins.className}>
        Parce que je crée et code ce site de A à Z uniquement sur mon temps libre, n'hésitez pas à m'aider à continuer pour le maintien du site. Et puis, je ne vais pas vous le cacher, des petits dons de 2€ ou plus, ça fait toujours plaisir ! ;-D
      </p>

      <div className='donate-btn'>
        <Link href="https://www.paypal.com/donate/?business=9HX4P949ZF2HE&no_recurring=1&currency_code=EUR" className={roboto.className} style={{fontWeight: 'bold', fontStyle:"italic", fontSize:"20px"}}>
          Faire un don via PayPal
        </Link>
      </div>

      <h2 className={roboto.className}>Me contacter</h2>
      <p className={poppins.className}>
        Pour me signaler des bugs ou faire des suggestions, veuillez remplir le formulaire ci-dessous. Je ne garantis pas la rapidité du traitement, mais les messages seront lus à coup sûr !
      </p>
      {
        loading 
        ?
        <div style={{display:"flex", justifyContent:"center", minHeight:"400px", paddingTop:"100px"}}>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperClass="blocks-wrapper"
            colors={['#2d6a8b', '#3c8db9', '#65a9cd', '#93c3dc', '#d1e5f0']}
          />
        </div>
        :
        <section className='formulaire'>
          {
            emailError && <div className={lato.className} style={{color:"red", textAlign:"center", margin:"10px"}}> "Une erreur est survenue, le message n'a divas pu être envoyé..."</div>
          }
          {
            !emailSent     
            ?
            <form ref={form} onSubmit={(e)=> submitMessage(e) } >
              <input type='text' name="nomPrenom" value={nomPrenom} placeholder='Prénom et nom' required onChange={(event: ChangeEvent<HTMLInputElement>)=> setNomPrenom(event.target.value)}/> <br/>
              <input type='email' name="email" value={email} placeholder='Votre e-mail' required onChange={(event: ChangeEvent<HTMLInputElement>)=> setEmail(event.target.value)}/><br/>
              <textarea  name="message" value={message} style={{fontFamily:"Arial"}} rows={10} placeholder='Votre message' onChange={(event: ChangeEvent<HTMLTextAreaElement>)=> setMessage(event.target.value)}/><br/>
              <input className='submit-btn' type='submit' value="Envoyer le message" style={{cursor: 'pointer'}} disabled={!nomPrenom || !email || !message} />
            </form>
            :
            <div style={{color: "green", textAlign:"center", marginTop: "50px", minHeight:"400px"}} className={lato.className}>Votre message a été envoyé !</div>
          }
          
        </section>

      }
    </ContactPageContainer>
  )
}

const ContactPageContainer = styled.main`
  padding: 15px 120px;
  width: 100vw;
  height: 100%;

  h2{
    font-weight: bold;
    font-size: 40px;
    margin: 20px 0;
  }
  p{
    text-indent: 50px;
    letter-spacing: 1.25px;
    font-size: 17.5px;
    line-height: 40px;
    text-align: justify;
    
    &.last{
      margin: 0 0 50px;
      
    }
  }

  .donate-btn{
    margin: 20px auto 50px;
    border-radius: 25px;
    border: 1px solid black;
    padding: 10px;
    width: 350px;
    text-align: center;
    background-color: #86bbd8;
    color: #1e1b22;
    letter-spacing: 1px;
  }
  .formulaire{
    width: 50%;
    margin: 25px auto;

    input, textarea {
      width:100%;
      font-size: 20px;
      padding: 5px 2.5px;
      margin: 5px 0;
    }
    textarea{

    }
  }
  .submit-btn {
    padding: 5px;
  }
`

export default FaireUnDon