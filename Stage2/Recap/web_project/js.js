document.addEventListener('DOMContentLoaded', (event) => {
    const moreButton = document.querySelector('#More');
    const moreSection = document.getElementById('MoreSection');

    // Function to position and toggle the display of #MoreSection
    const toggleMoreSection = () => {
        if (moreSection.classList.contains('hidden')) {
            moreSection.classList.remove('hidden');
            setTimeout(() => {
                moreSection.classList.add('visible');
            }, 10);
        } else {
            positionMoreSection();
            moreSection.classList.remove('visible');
        setTimeout(() => {
            moreSection.classList.add('hidden');
        }, 300); 
        }
    };

    // Function to position #MoreSection below the anchor
    const positionMoreSection = () => {
        const rect = moreButton.getBoundingClientRect();
        moreSection.style.top = `${rect.bottoms}px`;
        moreSection.style.left = `${rect.left}px`;
    };

    // Event listener for the "More" button click
    moreButton.addEventListener('click', (event) => {
        event.preventDefault();
        toggleMoreSection();
    });

    // Event listener for the ESC key press
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && moreSection.classList.contains('hidden')) {
            moreSection.classList.remove('visible');
        setTimeout(() => {
            moreSection.classList.add('hidden');
        }, 300);
        }
    });

    // Event listener for clicks outside of #MoreSection
    document.addEventListener('click', (event) => {
        if (moreSection.classList.contains('hidden') && !moreSection.contains(event.target) && !moreButton.contains(event.target)) {
            moreSection.classList.remove('visible');
        setTimeout(() => {
            moreSection.classList.add('hidden');
        }, 300);
        }
    });

    // Event listeners for hover over the "More" button
    moreButton.addEventListener('mouseenter', () => {
        positionMoreSection();
        moreSection.classList.add('visible');
    });

    // Event listener for hover away from the "More" button and #MoreSection
    moreButton.addEventListener('mouseleave', (event) => {
        if (!moreSection.contains(event.relatedTarget)) {
            moreSection.classList.remove('visible');
        setTimeout(() => {
            moreSection.classList.add('hidden');
        }, 300);
        }
    });

    moreSection.addEventListener('mouseleave', (event) => {
        if (!moreButton.contains(event.relatedTarget)) {
            moreSection.classList.remove('visible');
        setTimeout(() => {
            moreSection.classList.add('hidden');
        }, 300);
        }
    });

    window.addEventListener('resize', () => {
        if (moreSection.classList.contains('visible')) {
            positionMoreSection();
        }
    });
});
function toggleTheme() {
    var element = document.getElementById("colorme");
    if(element){
        element.classList.toggle("switchTheme");
    };
//     if (element.style.background == "white") {
//         element.style.background = "black";
//         element.style.color = "white";
//     }
//     else{
//         element.style.background = "white";
//         element.style.color = "black";
//     }
// }
}
