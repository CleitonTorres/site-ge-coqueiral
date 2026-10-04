export function matchesRequestOrigin(origin: string | null, requestUrl: string, host: string | null) {
  if (!origin) return false;
  try {
    const expected = new URL(requestUrl);
    // Next may normalize its internal URL to localhost even when the browser uses 127.0.0.1.
    if (host) expected.host = host;
    return origin === expected.origin;
  } catch { return false; }
}

export type CaptchaVerification = {success?: boolean; score?: number; action?: string; hostname?: string; 'error-codes'?: string[]};
export function registrationCaptchaFailure(captcha: CaptchaVerification, hostname: string) {
  const codes = Array.isArray(captcha['error-codes']) ? captcha['error-codes'] : [];
  if (!captcha.success) {
    if (codes.some(code => ['invalid-input-secret', 'missing-input-secret'].includes(code))) return {code: 'RECAPTCHA_CONFIGURATION', status: 503, error: 'A configuração do reCAPTCHA no servidor precisa ser corrigida. Entre em contato com o grupo.'};
    if (codes.includes('timeout-or-duplicate')) return {code: 'RECAPTCHA_EXPIRED', status: 403, error: 'A verificação de segurança expirou. Envie o formulário novamente.'};
    return {code: 'RECAPTCHA_TOKEN', status: 403, error: 'O Google não validou a verificação de segurança. Atualize a página e tente novamente.'};
  }
  if (captcha.hostname !== hostname) return {code: 'RECAPTCHA_HOSTNAME', status: 403, error: 'O domínio da verificação de segurança não corresponde ao endereço do site. Atualize a página e tente novamente.'};
  if (captcha.action !== 'inscricao') return {code: 'RECAPTCHA_ACTION', status: 403, error: 'A verificação de segurança não corresponde ao envio da inscrição. Atualize a página e tente novamente.'};
  if (typeof captcha.score !== 'number' || !Number.isFinite(captcha.score)) return {code: 'RECAPTCHA_SCORE_MISSING', status: 403, error: 'A verificação não retornou uma pontuação válida de reCAPTCHA v3. Confira a configuração do site.'};
  if (captcha.score < 0.5) return {code: 'RECAPTCHA_LOW_SCORE', status: 403, error: 'A verificação de segurança não aprovou esta tentativa. Tente novamente em outro navegador ou entre em contato com o grupo.'};
  return null;
}
