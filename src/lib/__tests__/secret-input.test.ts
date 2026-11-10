import { describe, expect, it } from "vitest";
import { parseSecretReplacement } from "../secret-input";

describe("替换密钥解析", () => {
  it("接受单账户 otpauth 链接并带出账户参数", () => {
    const { result } = parseSecretReplacement(
      "otpauth://totp/GitHub:alice?secret=JBSWY3DPEHPK3PXP&issuer=GitHub",
    );

    expect(result?.secret).toBe("JBSWY3DPEHPK3PXP");
    expect(result?.account?.issuer).toBe("GitHub");
    expect(result?.account?.name).toBe("alice");
  });

  it("接受带标签的 Base32 密钥", () => {
    const { result } = parseSecretReplacement("密钥: jbswy3dpehpk3pxp");

    expect(result?.secret).toBe("JBSWY3DPEHPK3PXP");
    expect(result?.account).toBeNull();
  });

  it("无关文本返回空结果", () => {
    expect(parseSecretReplacement("not base32!").result).toBeNull();
  });
});
