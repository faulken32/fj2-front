import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICv } from '../cv.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../cv.test-samples';

import { CvService, RestCv } from './cv.service';

const requireRestSample: RestCv = {
  ...sampleWithRequiredData,
  updateDate: sampleWithRequiredData.updateDate?.toJSON(),
};

describe('Cv Service', () => {
  let service: CvService;
  let httpMock: HttpTestingController;
  let expectedResult: ICv | ICv[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CvService);
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

    it('should create a Cv', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cv = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cv).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Cv', () => {
      const cv = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cv).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Cv', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Cv', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Cv', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCvToCollectionIfMissing', () => {
      it('should add a Cv to an empty array', () => {
        const cv: ICv = sampleWithRequiredData;
        expectedResult = service.addCvToCollectionIfMissing([], cv);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cv);
      });

      it('should not add a Cv to an array that contains it', () => {
        const cv: ICv = sampleWithRequiredData;
        const cvCollection: ICv[] = [
          {
            ...cv,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCvToCollectionIfMissing(cvCollection, cv);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Cv to an array that doesn't contain it", () => {
        const cv: ICv = sampleWithRequiredData;
        const cvCollection: ICv[] = [sampleWithPartialData];
        expectedResult = service.addCvToCollectionIfMissing(cvCollection, cv);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cv);
      });

      it('should add only unique Cv to an array', () => {
        const cvArray: ICv[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cvCollection: ICv[] = [sampleWithRequiredData];
        expectedResult = service.addCvToCollectionIfMissing(cvCollection, ...cvArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cv: ICv = sampleWithRequiredData;
        const cv2: ICv = sampleWithPartialData;
        expectedResult = service.addCvToCollectionIfMissing([], cv, cv2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cv);
        expect(expectedResult).toContain(cv2);
      });

      it('should accept null and undefined values', () => {
        const cv: ICv = sampleWithRequiredData;
        expectedResult = service.addCvToCollectionIfMissing([], null, cv, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cv);
      });

      it('should return initial array if no Cv is added', () => {
        const cvCollection: ICv[] = [sampleWithRequiredData];
        expectedResult = service.addCvToCollectionIfMissing(cvCollection, undefined, null);
        expect(expectedResult).toEqual(cvCollection);
      });
    });

    describe('compareCv', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCv(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCv(entity1, entity2);
        const compareResult2 = service.compareCv(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCv(entity1, entity2);
        const compareResult2 = service.compareCv(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCv(entity1, entity2);
        const compareResult2 = service.compareCv(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
