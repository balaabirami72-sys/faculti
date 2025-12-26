
import React from 'react';
import { Status } from '../types.ts';
import { CheckCircle2, Clock, Ban, MinusCircle, HelpCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyles = () => {
    switch (status) {
      case Status.AVAILABLE:
        return {
          bg: 'bg-emerald-100',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          icon: <CheckCircle2 size={14} className="mr-1.5" />
        };
      case Status.IN_CLASS:
        return {
          bg: 'bg-amber-100',
          text: 'text-amber-700',
          border: 'border-amber-200',
          icon: <Clock size={14} className="mr-1.5" />
        };
      case Status.BUSY:
        return {
          bg: 'bg-rose-100',
          text: 'text-rose-700',
          border: 'border-rose-200',
          icon: <Ban size={14} className="mr-1.5" />
        };
      case Status.DND:
        return {
          bg: 'bg-slate-700',
          text: 'text-white',
          border: 'border-slate-800',
          icon: <MinusCircle size={14} className="mr-1.5" />
        };
      default:
        return {
          bg: 'bg-slate-100',
          text: 'text-slate-600',
          border: 'border-slate-200',
          icon: <HelpCircle size={14} className="mr-1.5" />
        };
    }
  };

  const styles = getStyles();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles.bg} ${styles.text} ${styles.border}`}>
      {styles.icon}
      {status}
    </span>
  );
};

export default StatusBadge;
