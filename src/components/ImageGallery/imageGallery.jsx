import PropTypes from 'prop-types';
import { GalleryList } from './imageGallery.style';
import { ImageGalleryItem } from 'components/ImageGalleryItem/imageGalleryItem';

export const ImageGallery = ({ items }) => {
    return (
    <GalleryList>
        {   items.map(({ id, ...otherProps }) => (
            <ImageGalleryItem key={id} {...otherProps} />
            ))}
    </GalleryList>
    )
};

ImageGallery.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            webURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        })
    ),
};