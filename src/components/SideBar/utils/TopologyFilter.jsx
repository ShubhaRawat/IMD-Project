import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
import TopologyConstants from "../../../constants/TopologyConstants";

const TopologyFilter = (props) => {
  const { name, value, onChange } = props;

  const onChangeHandle = useCallback(
    (e) => {
      const selectedValue = e.target.value;
      onChange &&
        onChange({
          ...e,
          _data: { [name]: selectedValue !== "Select Topology" ? selectedValue : null },
        });
    },
    [onChange, name]
  );

  const _renderTopologyOptions = useMemo(() => {
    return Object.values(TopologyConstants).map((val) => (
      <option key={"topology-type-" + val} value={val}>
        {val}
      </option>
    ));
  }, []);

  return (
    <select value={value || ""} onChange={onChangeHandle} name={name}>
      <option value="">Select Topology</option>
      {_renderTopologyOptions}
    </select>
  );
};

TopologyFilter.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TopologyFilter;
