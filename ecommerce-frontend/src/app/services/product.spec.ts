import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';

describe('Product', () => {
  let service:  ProductService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject( ProductService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
