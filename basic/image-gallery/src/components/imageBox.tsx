function ImageBox(props: { src: string }) {
  const { src } = props;

  return (
    <div className="image-box">
      <img src={src} alt="image" />
    </div>
  );
}

export default ImageBox;
