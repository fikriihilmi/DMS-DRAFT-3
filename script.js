document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('document');
    const formData = new FormData();
    formData.append('document', fileInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Document uploaded successfully!');
            loadDocuments();
        } else {
            alert('Error uploading document.');
        }
    });
});

function loadDocuments() {
    fetch('/documents')
        .then(response => response.json())
        .then(data => {
            const documentList = document.getElementById('documentList');
            documentList.innerHTML = '';
            data.documents.forEach(doc => {
                const li = document.createElement('li');
                li.textContent = doc.name + ' - ' + doc.status;
                documentList.appendChild(li);
            });
        });
}

loadDocuments();
