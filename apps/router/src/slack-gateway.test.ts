import { describe, expect, it, vi } from "vitest";
import type { WebClient } from "@slack/web-api";
import { slackGateway } from "./slack-gateway.ts";

describe("file upload destinations", () => {
  it("preserves thread replies and omits absent thread IDs for channel uploads", async () => {
    const filesUploadV2 = vi.fn().mockResolvedValue({ ok: true });
    const gateway = slackGateway({ filesUploadV2 } as unknown as WebClient);
    if (!gateway.uploadFile) throw new Error("Upload gateway missing");
    const file = { channel: "C_TEST", filename: "audit.zip", data: Buffer.from("fixture") };
    await gateway.uploadFile(file);
    expect(filesUploadV2.mock.calls[0][0]).not.toHaveProperty("thread_ts");
    expect(filesUploadV2.mock.calls[0][0]).toMatchObject({ channel_id: "C_TEST", filename: "audit.zip" });
    await gateway.uploadFile({ ...file, thread_ts: "123.456" });
    expect(filesUploadV2.mock.calls[1][0]).toMatchObject({ channel_id: "C_TEST", thread_ts: "123.456" });
  });
});
