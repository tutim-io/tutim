import React from 'react';
import { Button } from "../../components/ui/button"

export const SimpleButton = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <Button type="button" variant="default" onClick={onClick}>
      {label}
    </Button>
  );
};
