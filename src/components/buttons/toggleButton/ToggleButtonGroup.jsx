import React, { useState, useEffect } from 'react';
import {
  Grid,
} from '@material-ui/core';

const ToggleButtonGroup = (props) => {
  const {
    value, onChange, children, ...rest
  } = props;
  const [elements, setElements] = useState(null);

  useEffect(() => {
    const elems = React.Children.map(children, (child) => React.cloneElement(child, {
      activebutton: child.props.value === value ? 1 : 0,
      onInteractionHandler: (onChange),
    }));
    setElements(elems);
  }, [value, children, onChange]);

  return (
    <Grid {...rest}>
      {elements}
    </Grid>
  );
};

export default ToggleButtonGroup;
