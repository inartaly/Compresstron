document.getElementById('compressButton').addEventListener('click', async () => {
  const files = document.getElementById('fileInput').files;
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  for (const file of files) {
    const originalBlob = await readFile(file);
    const compressedBlob = await compressImage(originalBlob);
    const downloadLink = createDownloadLink(compressedBlob, file.name);
    outputDiv.appendChild(downloadLink);
  }
});

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

function compressImage(dataURL) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      canvas.toBlob(resolve, 'image/png', 0.8); // Adjust quality here
    };
    img.src = dataURL;
  });
}

function createDownloadLink(blob, fileName) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.textContent = `Download ${fileName}`;
  link.style.display = 'block';
  return link;
}
