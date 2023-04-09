import PropTypes from 'prop-types';

export default function Filter({ onChange, filter }) {
  return (
    <>
      <p>Find contacts by name</p>
      <input type="text" value={filter} name="filter" onChange={onChange} />
    </>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func,
};
