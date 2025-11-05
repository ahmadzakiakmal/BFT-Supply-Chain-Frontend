'use client';

import { useState } from 'react';
import { getShardClient } from '@/lib/api-client';
import SessionHeader from '@/components/operator/SessionHeader';
import ProgressStepper from '@/components/operator/ProgressStepper';
import StartSessionStep from '@/components/operator/StartSessionStep';
import ScanPackageStep from '@/components/operator/ScanPackageStep';
import ValidatePackageStep from '@/components/operator/ValidatePackageStep';
import QualityCheckStep from '@/components/operator/QualityCheckStep';
import CreateLabelStep from '@/components/operator/CreateLabelStep';
import CommitSessionStep from '@/components/operator/CommitSessionStep';

export default function OperatorPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Session data
  const [sessionData, setSessionData] = useState({
    sessionId: null,
    operatorId: null,
    startTime: null,
    status: 'ready',
    packageInfo: null,
    validationResult: null,
    qcResult: null,
    labelInfo: null,
    commitResult: null,
  });

  const shardClient = getShardClient('shard-a');

  // Helper to mark step as complete and move to next
  const completeStep = (stepNumber) => {
    setCompletedSteps((prev) => [...prev, stepNumber]);
    setCurrentStep(stepNumber + 1);
  };

  // Step 1: Create Session
  const handleStartSession = async (operatorId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await shardClient.createSession(operatorId);
      setSessionData((prev) => ({
        ...prev,
        sessionId: response.session_id,
        operatorId: operatorId,
        startTime: new Date().toISOString(),
        status: 'active',
      }));
      completeStep(1);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create session');
      console.error('Create session error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Scan Package
  const handleScanPackage = async (packageId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await shardClient.scanPackage(sessionData.sessionId, packageId);
      setSessionData((prev) => ({
        ...prev,
        packageInfo: response,
      }));
      completeStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to scan package');
      console.error('Scan package error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Validate Package
  const handleValidatePackage = async (signature) => {
    setLoading(true);
    setError(null);
    try {
      const response = await shardClient.validatePackage(
        sessionData.sessionId,
        signature,
        sessionData.packageInfo.package_id
      );
      setSessionData((prev) => ({
        ...prev,
        validationResult: response,
      }));
      completeStep(3);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to validate package');
      console.error('Validate package error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Quality Check
  const handleQualityCheck = async (passed, issues) => {
    setLoading(true);
    setError(null);
    try {
      const response = await shardClient.performQualityCheck(
        sessionData.sessionId,
        passed,
        issues
      );
      setSessionData((prev) => ({
        ...prev,
        qcResult: response,
      }));
      completeStep(4);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit quality check');
      console.error('QC error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Step 5: Create Label
  const handleCreateLabel = async (courierId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await shardClient.createLabel(sessionData.sessionId, courierId);
      setSessionData((prev) => ({
        ...prev,
        labelInfo: response,
      }));
      completeStep(5);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create label');
      console.error('Create label error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Step 6: Commit Session
  const handleCommitSession = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await shardClient.commitSession(sessionData.sessionId);
      setSessionData((prev) => ({
        ...prev,
        commitResult: response,
        status: 'completed',
      }));
      completeStep(6);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to commit session');
      console.error('Commit error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Operator Interface
        </h1>
        <p className="text-gray-600">
          Process packages through the 6-step workflow
        </p>
      </div>

      <SessionHeader
        sessionId={sessionData.sessionId}
        operatorId={sessionData.operatorId}
        startTime={sessionData.startTime}
        status={sessionData.status}
      />

      <ProgressStepper currentStep={currentStep} completedSteps={completedSteps} />

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6">
          <p className="text-red-800 font-semibold">Error:</p>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Step Components */}
      {currentStep === 1 && (
        <StartSessionStep onStart={handleStartSession} loading={loading} />
      )}

      {currentStep === 2 && (
        <ScanPackageStep
          onScan={handleScanPackage}
          loading={loading}
          sessionData={sessionData}
        />
      )}

      {currentStep === 3 && (
        <ValidatePackageStep
          onValidate={handleValidatePackage}
          loading={loading}
          sessionData={sessionData}
        />
      )}

      {currentStep === 4 && (
        <QualityCheckStep onQC={handleQualityCheck} loading={loading} />
      )}

      {currentStep === 5 && (
        <CreateLabelStep
          onCreateLabel={handleCreateLabel}
          loading={loading}
          sessionData={sessionData}
        />
      )}

      {currentStep === 6 && (
        <CommitSessionStep
          onCommit={handleCommitSession}
          loading={loading}
          sessionData={sessionData}
        />
      )}
    </div>
  );
}