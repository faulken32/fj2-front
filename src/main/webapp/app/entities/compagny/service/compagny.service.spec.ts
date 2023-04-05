import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICompagny } from '../compagny.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../compagny.test-samples';

import { CompagnyService } from './compagny.service';

const requireRestSample: ICompagny = {
  ...sampleWithRequiredData,
};

describe('Compagny Service', () => {
  let service: CompagnyService;
  let httpMock: HttpTestingController;
  let expectedResult: ICompagny | ICompagny[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CompagnyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Compagny', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const compagny = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(compagny).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Compagny', () => {
      const compagny = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(compagny).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Compagny', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Compagny', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Compagny', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCompagnyToCollectionIfMissing', () => {
      it('should add a Compagny to an empty array', () => {
        const compagny: ICompagny = sampleWithRequiredData;
        expectedResult = service.addCompagnyToCollectionIfMissing([], compagny);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(compagny);
      });

      it('should not add a Compagny to an array that contains it', () => {
        const compagny: ICompagny = sampleWithRequiredData;
        const compagnyCollection: ICompagny[] = [
          {
            ...compagny,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCompagnyToCollectionIfMissing(compagnyCollection, compagny);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Compagny to an array that doesn't contain it", () => {
        const compagny: ICompagny = sampleWithRequiredData;
        const compagnyCollection: ICompagny[] = [sampleWithPartialData];
        expectedResult = service.addCompagnyToCollectionIfMissing(compagnyCollection, compagny);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(compagny);
      });

      it('should add only unique Compagny to an array', () => {
        const compagnyArray: ICompagny[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const compagnyCollection: ICompagny[] = [sampleWithRequiredData];
        expectedResult = service.addCompagnyToCollectionIfMissing(compagnyCollection, ...compagnyArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const compagny: ICompagny = sampleWithRequiredData;
        const compagny2: ICompagny = sampleWithPartialData;
        expectedResult = service.addCompagnyToCollectionIfMissing([], compagny, compagny2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(compagny);
        expect(expectedResult).toContain(compagny2);
      });

      it('should accept null and undefined values', () => {
        const compagny: ICompagny = sampleWithRequiredData;
        expectedResult = service.addCompagnyToCollectionIfMissing([], null, compagny, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(compagny);
      });

      it('should return initial array if no Compagny is added', () => {
        const compagnyCollection: ICompagny[] = [sampleWithRequiredData];
        expectedResult = service.addCompagnyToCollectionIfMissing(compagnyCollection, undefined, null);
        expect(expectedResult).toEqual(compagnyCollection);
      });
    });

    describe('compareCompagny', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCompagny(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCompagny(entity1, entity2);
        const compareResult2 = service.compareCompagny(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCompagny(entity1, entity2);
        const compareResult2 = service.compareCompagny(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCompagny(entity1, entity2);
        const compareResult2 = service.compareCompagny(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
