import logo from '../../assets/images/Task Manager.png';

const Logo = () => {
    return <img src={logo} alt='task Manager logo' className='logo'
                style={{
                    width: '220px',
                    height: 'auto',
                    display: 'block',
                    marginLeft: '0',
                }}
    />;
};
export default Logo;