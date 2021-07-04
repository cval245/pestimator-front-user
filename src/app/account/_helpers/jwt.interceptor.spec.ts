import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { JwtInterceptor } from './jwt.interceptor';

describe('JwtInterceptor', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule,
                  RouterTestingModule],
        providers: [
            JwtInterceptor
        ]
    }));

    it('should be created', () => {
        const interceptor: JwtInterceptor = TestBed.inject(JwtInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
