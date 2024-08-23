
const navigationBar = getElementById("navigationBar");


//to avoid having the navigation bar rewritten in every single HTML page, I've created a function that loads it when the HTML page Body finishes loading.
function loadNavigationBar(){
    navigationBar.innerHTML = `
    <nav>
        <ul class="nav-ul">
            <div id="logo">
                <li class="nav-li"><a href="./index.html"><img src="./img/ripoffLogo.png" alt="Ripoff Logo"></a></li>
                <li class="nav-li"><a href="./index.html">Ripoff</a></li>
            </div>
            <li class="nav-li"><input id="navigationSearch" type="text" placeholder="Search products..."></li>
            <li class="nav-li"><a href="javascript:search()"><img src="./img/search.png" alt="Ripoff Logo"></a></li>
        </ul>
    </nav>
    `;
}

function search(){
    const navigationSearchValue = getValueOfElementById("navigationSearch");
    //There's no else because we don't want the browser to do anything if there's nothing in the search bar.
    if(navigationSearchValue && navigationSearchValue!= ""){

        window.location.replace("./search?keyword="+navigationSearchValue);
    }
}