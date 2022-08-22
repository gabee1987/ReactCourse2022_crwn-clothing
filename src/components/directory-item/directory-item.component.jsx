import {
  DirectoryItemBody,
  DirectoryItemContainer,
  BackgroundImage,
} from './directory-item.styles';

const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  return (
    <DirectoryItemContainer>
      <BackgroundImage
        imageUrl={imageUrl}
        // Old Sass style format
        // style={{
        //   backgroundImage: `url(${imageUrl})`,
        // }}
      />
      <DirectoryItemBody>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
