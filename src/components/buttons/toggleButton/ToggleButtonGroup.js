import React, { useState, useEffect } from 'react';
import {
  Grid,
} from '@material-ui/core';

const ToggleButtonGroup = (props) => {
  const [value, setValue] = useState();
  const [elements, setElements] = useState(null);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    const onToggle = async (val) => {
      const success = await props.onChange(val) ;

      if (success) {
        setValue(val);
      }
    }

    const elems = React.Children.map(props.children, (child) => {
      return React.cloneElement(child, {
        activebutton: child.props.value === value ? 1 : 0,
        onInteraction: (() => {onToggle(child.props.value)}),
      }
      );
    });
    setElements(elems);
  }, [value, props]);

  return (
    <Grid {...props}>
      {elements}
    </Grid>
  );
}

export default ToggleButtonGroup;
