import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const WORKFLOW_STEPS = [
  {
    id: 'start-session',
    label: 'Start Session',
    description: 'Create a new package processing session',
    order: 1,
    completed: false,
  },
  {
    id: 'scan-package',
    label: 'Scan Package',
    description: 'Scan package barcode to retrieve information',
    order: 2,
    completed: false,
  },
  {
    id: 'validate-package',
    label: 'Validate Package',
    description: 'Verify supplier signature and trust status',
    order: 3,
    completed: false,
  },
  {
    id: 'quality-check',
    label: 'Quality Check',
    description: 'Perform physical inspection and quality assessment',
    order: 4,
    completed: false,
  },
  {
    id: 'create-label',
    label: 'Create Label',
    description: 'Generate shipping label with tracking number',
    order: 5,
    completed: false,
  },
  {
    id: 'commit-l1',
    label: 'Commit to L1',
    description: 'Finalize session and commit to blockchain',
    order: 6,
    completed: false,
  },
];

export function getStepIndex(stepId) {
  return WORKFLOW_STEPS.findIndex((s) => s.id === stepId);
}

export function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString();
}

export function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}

export function getStepColor(stepId, completed) {
  if (completed) return 'text-green-600';
  return 'text-gray-400';
}

export function truncateHash(hash, length = 8) {
  if (hash.length <= length * 2) return hash;
  return `${hash.slice(0, length)}...${hash.slice(-length)}`;
}