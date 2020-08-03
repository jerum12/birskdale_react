
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Report1 from './Report1'

const Example = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
 
  return (
    <div>
      <Report1 ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

export default Example