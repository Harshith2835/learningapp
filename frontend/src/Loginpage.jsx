import './styles/loginpage.css'

export default function Loginpage(){
  return (
    <div className='homepage-section'>
      <img className="homepage-img" src= "/src/assets/homepage-image.png.webp" alt="" />
      <div className='login-section'>
        <h3>Welcome to PixelSpeak</h3>
        <p>Learn languages in a fun and interactive way</p>

        <button>Log in</button>
        <p>or</p>
        <button>Sign up</button>
      </div>
    </div>
  )
}