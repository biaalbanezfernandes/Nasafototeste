document.addEventListener('DOMContentLoaded', () => {
    // Set max date for input to today
    const dateInput = document.getElementById('birthdate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.max = today;
    dateInput.value = today; // Default to today

    const form = document.getElementById('apod-form');
    const submitBtn = document.getElementById('submit-btn');

    // UI Sections
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const resultSection = document.getElementById('result-section');

    // Result Elements
    const titleEl = document.getElementById('apod-title');
    const dateBadgeEl = document.getElementById('apod-date-badge');
    const mediaWrapper = document.getElementById('media-wrapper');
    const copyrightEl = document.getElementById('apod-copyright');
    const descriptionEl = document.getElementById('apod-description');
    const errorMessageEl = document.getElementById('error-message');

    // Backend URL
    const API_BASE_URL = 'http://localhost:8001/apod';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const selectedDate = dateInput.value;
        if (!selectedDate) return;

        // Reset UI
        hideAllStates();
        loadingState.classList.remove('hidden');
        submitBtn.disabled = true;

        // Button animation
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Scanning Space...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

        try {
            const response = await fetch(`${API_BASE_URL}?date=${selectedDate}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Cosmic signal interrupted.');
            }

            await renderAPOD(data);

        } catch (error) {
            console.error('Sequence Error:', error);
            showError(error.message);
        } finally {
            loadingState.classList.add('hidden');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
        }
    });

    async function renderAPOD(data) {
        // Clear previous media
        mediaWrapper.innerHTML = '';
        resultSection.classList.remove('visible'); // Prepare for transition

        // Map data to UI
        titleEl.textContent = data.title;
        dateBadgeEl.textContent = data.date;
        descriptionEl.textContent = data.explanation;

        if (data.copyright) {
            copyrightEl.textContent = `© ${data.copyright}`;
            copyrightEl.style.display = 'block';
        } else {
            copyrightEl.style.display = 'none';
        }

        // Handle Media Transformation
        return new Promise((resolve) => {
            if (data.media_type === 'video') {
                const iframe = document.createElement('iframe');
                iframe.src = data.url;
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                mediaWrapper.appendChild(iframe);

                showResult();
                resolve();
            } else {
                const img = document.createElement('img');
                img.src = data.url;
                img.alt = data.title;

                img.onload = () => {
                    showResult();
                    resolve();
                };

                img.onerror = () => {
                    showError("Failed to render the cosmic capture.");
                    resolve();
                };

                // Click to view HD
                if (data.hdurl) {
                    img.style.cursor = 'zoom-in';
                    img.title = 'View High-Resolution Capture';
                    img.onclick = () => window.open(data.hdurl, '_blank');
                }

                mediaWrapper.appendChild(img);
            }
        });
    }

    function showResult() {
        resultSection.classList.remove('hidden');
        // Small timeout for browser to register the removal of 'hidden' before adding 'visible'
        setTimeout(() => {
            resultSection.classList.add('visible');
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);
    }

    function showError(message) {
        errorMessageEl.textContent = message;
        errorState.classList.remove('hidden');
        errorState.classList.add('visible');
    }

    function hideAllStates() {
        loadingState.classList.add('hidden');
        errorState.classList.add('hidden');
        resultSection.classList.add('hidden');
        resultSection.classList.remove('visible');
    }
});
