import fx from 'simple-fxtrade';

export const getAccounts = async () => {
  return await fx.accounts();
};

export const getAccountSummary = async (accountId) => {
  return await fx.accounts({ id: accountId });
};
