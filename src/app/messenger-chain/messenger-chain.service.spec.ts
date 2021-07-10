import { TestBed } from "@angular/core/testing";

import { MessengerChainService } from "./messenger-chain.service";

describe("MessengerChainService", () => {
  let service: MessengerChainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessengerChainService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
