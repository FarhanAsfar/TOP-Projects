import chefIcon from "../images/chef-claude-icon.png";

function Header(){
    return(
        <>
            <header>
                <img src={chefIcon} alt="icon" />
                <h1>Chef Claude</h1>
            </header>
        </>
    )
}


export default Header;