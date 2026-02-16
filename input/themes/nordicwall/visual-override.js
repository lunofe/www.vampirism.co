/*
 * Custom function used to generate the output of the override.css file
 */

var generateOverride = function (params) {
    let output = '';

    if (params.submenu === 'custom') {
        output += `
        .navbar .navbar__submenu {
               white-space: wrap;
               width: ${params.submenuWidth}px;     
        }
        .navbar .has-submenu .has-submenu:active > .navbar__submenu,
        .navbar .has-submenu .has-submenu:focus > .navbar__submenu,
        .navbar .has-submenu .has-submenu:hover > .navbar__submenu {
               left: ${params.submenuWidth}px;  
        }
        .navbar .has-submenu .has-submenu:active > .navbar__submenu.is-right-submenu,
        .navbar .has-submenu .has-submenu:focus > .navbar__submenu.is-right-submenu,
        .navbar .has-submenu .has-submenu:hover > .navbar__submenu.is-right-submenu {
               left: -${params.submenuWidth}px; 
        }`;
    }   

    if(params.lazyLoadEffect === 'fadein') {
        output += ` 
         img[loading] {
               opacity: 0;
         }

         img.is-loaded {
               opacity: 1;
               transition: opacity 1s cubic-bezier(0.215, 0.61, 0.355, 1), transform .6s ease-out, filter .6s ease-out; 
         }`;    	 
    } 
        
  
    return output;
}

module.exports = generateOverride;
