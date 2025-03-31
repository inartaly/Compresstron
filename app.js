document.getElementById('compressButton').addEventListener('click', async () => {
  const files = document.getElementById('fileInput').files;
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const compressed = compressWithUPNG(arrayBuffer);
    const blob = new Blob([compressed], { type: 'image/png' });
    const downloadLink = createDownloadLink(blob, file.name);
    outputDiv.appendChild(downloadLink);
  }
});

function compressWithUPNG(buffer) {
  const img = UPNG.decode(buffer); // Decode the image
  const rgba = UPNG.toRGBA8(img); // Convert to RGBA format
  return UPNG.encode(rgba, img.width, img.height, 0); // Compress with lossless quality
}

function createDownloadLink(blob, fileName) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName.replace(/(\.[^/.]+)$/, '_compressed.png'); // Rename with "_compressed"
  link.textContent = `Download ${fileName}`;
  link.style.display = 'block';
  return link;
}
