import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICandidatePreference } from '../candidate-preference.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../candidate-preference.test-samples';

import { CandidatePreferenceService } from './candidate-preference.service';

const requireRestSample: ICandidatePreference = {
  ...sampleWithRequiredData,
};

describe('CandidatePreference Service', () => {
  let service: CandidatePreferenceService;
  let httpMock: HttpTestingController;
  let expectedResult: ICandidatePreference | ICandidatePreference[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CandidatePreferenceService);
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

    it('should create a CandidatePreference', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const candidatePreference = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(candidatePreference).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CandidatePreference', () => {
      const candidatePreference = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(candidatePreference).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CandidatePreference', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CandidatePreference', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CandidatePreference', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCandidatePreferenceToCollectionIfMissing', () => {
      it('should add a CandidatePreference to an empty array', () => {
        const candidatePreference: ICandidatePreference = sampleWithRequiredData;
        expectedResult = service.addCandidatePreferenceToCollectionIfMissing([], candidatePreference);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(candidatePreference);
      });

      it('should not add a CandidatePreference to an array that contains it', () => {
        const candidatePreference: ICandidatePreference = sampleWithRequiredData;
        const candidatePreferenceCollection: ICandidatePreference[] = [
          {
            ...candidatePreference,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCandidatePreferenceToCollectionIfMissing(candidatePreferenceCollection, candidatePreference);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CandidatePreference to an array that doesn't contain it", () => {
        const candidatePreference: ICandidatePreference = sampleWithRequiredData;
        const candidatePreferenceCollection: ICandidatePreference[] = [sampleWithPartialData];
        expectedResult = service.addCandidatePreferenceToCollectionIfMissing(candidatePreferenceCollection, candidatePreference);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(candidatePreference);
      });

      it('should add only unique CandidatePreference to an array', () => {
        const candidatePreferenceArray: ICandidatePreference[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const candidatePreferenceCollection: ICandidatePreference[] = [sampleWithRequiredData];
        expectedResult = service.addCandidatePreferenceToCollectionIfMissing(candidatePreferenceCollection, ...candidatePreferenceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const candidatePreference: ICandidatePreference = sampleWithRequiredData;
        const candidatePreference2: ICandidatePreference = sampleWithPartialData;
        expectedResult = service.addCandidatePreferenceToCollectionIfMissing([], candidatePreference, candidatePreference2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(candidatePreference);
        expect(expectedResult).toContain(candidatePreference2);
      });

      it('should accept null and undefined values', () => {
        const candidatePreference: ICandidatePreference = sampleWithRequiredData;
        expectedResult = service.addCandidatePreferenceToCollectionIfMissing([], null, candidatePreference, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(candidatePreference);
      });

      it('should return initial array if no CandidatePreference is added', () => {
        const candidatePreferenceCollection: ICandidatePreference[] = [sampleWithRequiredData];
        expectedResult = service.addCandidatePreferenceToCollectionIfMissing(candidatePreferenceCollection, undefined, null);
        expect(expectedResult).toEqual(candidatePreferenceCollection);
      });
    });

    describe('compareCandidatePreference', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCandidatePreference(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCandidatePreference(entity1, entity2);
        const compareResult2 = service.compareCandidatePreference(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCandidatePreference(entity1, entity2);
        const compareResult2 = service.compareCandidatePreference(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCandidatePreference(entity1, entity2);
        const compareResult2 = service.compareCandidatePreference(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
