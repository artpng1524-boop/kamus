// Memuat data dari file JSON
const diksiData = [
    {
        "kata": "Akomodasi",
        "deskripsi": "Sesuatu yang disediakan untuk memenuhi kebutuhan, seperti tempat tinggal atau fasilitas.",
        "contoh": [
            "Hotel ini menyediakan akomodasi yang nyaman bagi para tamu.",
            "Pemerintah berupaya menyediakan akomodasi layak untuk korban bencana."
        ]
    },
    // ... tambahkan data diksi lainnya di sini
];

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    searchResults.innerHTML = '';

    if (query.length > 0) {
        const filteredData = diksiData.filter(diksi => 
            diksi.kata.toLowerCase().includes(query)
        );

        if (filteredData.length > 0) {
            filteredData.forEach(diksi => {
                const resultCard = document.createElement('div');
                resultCard.classList.add('result-card');
                
                let examplesHtml = '';
                diksi.contoh.forEach(contoh => {
                    examplesHtml += `
                        <p>${contoh} 
                            <button class="copy-btn" data-text="${contoh}">Salin</button>
                        </p>
                    `;
                });

                resultCard.innerHTML = `
                    <h3>${diksi.kata}</h3>
                    <p>${diksi.deskripsi}</p>
                    <div class="examples-container">
                        <h4>Contoh Kalimat:</h4>
                        ${examplesHtml}
                    </div>
                `;
                searchResults.appendChild(resultCard);
            });
            
            // Tambahkan event listener untuk tombol salin setelah semua kartu dibuat
            document.querySelectorAll('.copy-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const textToCopy = e.target.getAttribute('data-text');
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        alert('Tersalin!');
                    });
                });
            });

        } else {
            searchResults.innerHTML = '<p>Tidak ada hasil yang ditemukan.</p>';
        }
    }
});
