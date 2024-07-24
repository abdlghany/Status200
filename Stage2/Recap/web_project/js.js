document.addEventListener('DOMContentLoaded', (event) => {
    const moreButton = document.querySelector('#More');
    const moreSection = document.getElementById('MoreSection');

    // Function to position and toggle the display of #MoreSection
    const toggleMoreSection = () => {
        if (moreSection.style.display === 'block') {
            moreSection.style.display = 'none';
        } else {
            positionMoreSection();
            moreSection.style.display = 'block';
        }
    };

    // Function to position #MoreSection below the anchor
    const positionMoreSection = () => {
        const rect = moreButton.getBoundingClientRect();
        moreSection.style.top = `${rect.bottom + window.scrollY}px`;
        moreSection.style.left = `${rect.left + window.scrollX}px`;
    };

    // Event listener for the "More" button click
    moreButton.addEventListener('click', (event) => {
        event.preventDefault();
        toggleMoreSection();
    });

    // Event listener for the ESC key press
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && moreSection.style.display === 'block') {
            moreSection.style.display = 'none';
        }
    });

    // Event listener for clicks outside of #MoreSection
    document.addEventListener('click', (event) => {
        if (moreSection.style.display === 'block' && !moreSection.contains(event.target) && !moreButton.contains(event.target)) {
            moreSection.style.display = 'none';
        }
    });

    // Event listeners for hover over the "More" button
    moreButton.addEventListener('mouseenter', () => {
        positionMoreSection();
        moreSection.style.display = 'block';
    });

    // Event listener for hover away from the "More" button and #MoreSection
    moreButton.addEventListener('mouseleave', (event) => {
        if (!moreSection.contains(event.relatedTarget)) {
            moreSection.style.display = 'none';
        }
    });

    moreSection.addEventListener('mouseleave', (event) => {
        if (!moreButton.contains(event.relatedTarget)) {
            moreSection.style.display = 'none';
        }
    });

    // Adjust the position of #MoreSection when the window is scrolled or resized
    window.addEventListener('scroll', () => {
        if (moreSection.style.display === 'block') {
            positionMoreSection();
        }
    });

    window.addEventListener('resize', () => {
        if (moreSection.style.display === 'block') {
            positionMoreSection();
        }
    });
});
function toggleTheme(){
    var element = document.getElementById("colorme");
        if(element.classList.contains('dark')){
            element.classList.remove('dark');
        }
        else
        element.classList.add('dark')

}

