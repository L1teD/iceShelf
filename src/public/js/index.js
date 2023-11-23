

const openSideMenu = () => {
    document.getElementById('side-menu').style.visibility = 'visible'
    document.getElementById('side-menu').hidden = false
}

const closeSideMenu = () => {
    document.getElementById('side-menu').style.visibility = 'hidden'
    document.getElementById('side-menu').hidden = true
}

const openShop = () => {
    document.getElementById('market-place').hidden = false
    document.getElementById('cart-section').hidden = true
    document.getElementById('profile-section').hidden = true
    document.getElementById('stock-section').hidden = true
}

const openCart = () => {
    document.getElementById('cart-section').hidden = false
    document.getElementById('market-place').hidden = true
    document.getElementById('profile-section').hidden = true
    document.getElementById('stock-section').hidden = true
}

const openProfile = () => {
    document.getElementById('profile-section').hidden = false
    document.getElementById('cart-section').hidden = true
    document.getElementById('market-place').hidden = true
    document.getElementById('stock-section').hidden = true
}

const openStock = () => {
    document.getElementById('stock-section').hidden = false
    document.getElementById('profile-section').hidden = true
    document.getElementById('cart-section').hidden = true
    document.getElementById('market-place').hidden = true
}