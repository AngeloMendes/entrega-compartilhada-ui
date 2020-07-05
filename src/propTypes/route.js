import PropTypes from 'prop-types';
import { DeliveryStatus } from 'constants/enums';

export default PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  info: PropTypes.string,
  status: PropTypes.oneOf(Object.keys(DeliveryStatus)),
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    collectAddress: PropTypes.string,
    deliveryAddress: PropTypes.string,
    status: PropTypes.oneOf(Object.keys(DeliveryStatus)),
  })),
});
