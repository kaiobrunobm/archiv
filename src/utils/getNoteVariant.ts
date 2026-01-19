export default function getNoteVariant (index: number, total: number) {
    if (total === 1) return 'alone';
    if (index === 0) return 'top';
    if (index === total - 1) return 'bottom';
    return 'middle';
  };
